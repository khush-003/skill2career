import { useEffect, useMemo, useState } from 'react';

const pageTemplates = import.meta.glob('./legacy-pages/*.html', {
  query: '?raw',
  import: 'default',
});

function getPageKey() {
  const filename = window.location.pathname.split('/').pop() || 'index.html';
  return filename.replace(/\.html$/, '') || 'index';
}

function LegacyPage({ source }) {
  const parsed = useMemo(() => {
    const documentTemplate = new DOMParser().parseFromString(source, 'text/html');
    const body = documentTemplate.body;
    const scripts = [...documentTemplate.querySelectorAll('script')].map((script) => ({
      attributes: [...script.attributes].map(({ name, value }) => [name, value]),
      content: script.textContent,
    }));

    body.querySelectorAll('script').forEach((script) => script.remove());

    return {
      title: documentTemplate.title,
      description: documentTemplate.querySelector('meta[name="description"]')?.content,
      lang: documentTemplate.documentElement.lang,
      bodyClass: body.className,
      markup: body.innerHTML,
      headAssets: [...documentTemplate.head.children]
        .filter((element) =>
          element.tagName === 'STYLE' ||
          (element.tagName === 'LINK' && element.rel === 'stylesheet'),
        )
        .map((element) => ({
          tag: element.tagName.toLowerCase(),
          href: element.getAttribute('href'),
          content: element.textContent,
          attributes: [...element.attributes].map(({ name, value }) => [name, value]),
        })),
      scripts,
    };
  }, [source]);

  useEffect(() => {
    const previousTitle = document.title;
    const previousBodyClass = document.body.className;
    const previousLanguage = document.documentElement.lang;
    const appendedNodes = [];
    let cancelled = false;

    document.title = parsed.title || previousTitle;
    document.body.className = parsed.bodyClass;
    if (parsed.lang) document.documentElement.lang = parsed.lang;

    if (parsed.description) {
      let description = document.querySelector('meta[name="description"]');
      if (!description) {
        description = document.createElement('meta');
        description.name = 'description';
        document.head.appendChild(description);
        appendedNodes.push(description);
      }
      description.content = parsed.description;
    }

    for (const asset of parsed.headAssets) {
      const element = document.createElement(asset.tag);
      if (asset.tag === 'style') {
        element.textContent = asset.content;
      } else {
        for (const [name, value] of asset.attributes) {
          if (name === 'href') {
            element.href = new URL(value, `${window.location.origin}/`).href;
          } else {
            element.setAttribute(name, value);
          }
        }
      }
      document.head.appendChild(element);
      appendedNodes.push(element);
    }

    const loadScripts = async () => {
      for (const scriptData of parsed.scripts) {
        if (cancelled) return;
        const script = document.createElement('script');
        for (const [name, value] of scriptData.attributes) {
          if (name === 'src') {
            script.src = new URL(value, `${window.location.origin}/`).href;
          } else {
            script.setAttribute(name, value);
          }
        }
        if (script.src) {
          script.async = false;
          await new Promise((resolve) => {
            script.onload = resolve;
            script.onerror = () => {
              console.error(`Failed to load page script: ${script.src}`);
              resolve();
            };
            document.body.appendChild(script);
          });
        } else {
          script.textContent = scriptData.content;
          document.body.appendChild(script);
        }
        appendedNodes.push(script);
      }

      if (!cancelled && parsed.scripts.length) {
        document.dispatchEvent(new Event('DOMContentLoaded'));
      }
    };

    loadScripts();

    return () => {
      cancelled = true;
      appendedNodes.forEach((node) => node.remove());
      document.title = previousTitle;
      document.body.className = previousBodyClass;
      document.documentElement.lang = previousLanguage;
    };
  }, [parsed]);

  return (
    <div
      id="legacy-page"
      dangerouslySetInnerHTML={{ __html: parsed.markup }}
    />
  );
}

export default function App() {
  const pageKey = getPageKey();
  const loadTemplate =
    pageTemplates[`./legacy-pages/${pageKey}.html`] ??
    pageTemplates['./legacy-pages/index.html'];
  const [loadedPage, setLoadedPage] = useState({
    pageKey: null,
    source: null,
    error: null,
  });

  useEffect(() => {
    let active = true;
    setLoadedPage({ pageKey, source: null, error: null });
    loadTemplate()
      .then((source) => {
        if (active) setLoadedPage({ pageKey, source, error: null });
      })
      .catch((error) => {
        console.error(`Failed to load page template: ${pageKey}`, error);
        if (active) setLoadedPage({ pageKey, source: null, error });
      });
    return () => {
      active = false;
    };
  }, [loadTemplate, pageKey]);

  if (loadedPage.pageKey !== pageKey || !loadedPage.source) {
    if (loadedPage.pageKey === pageKey && loadedPage.error) {
      return <main role="alert">This page could not be loaded.</main>;
    }
    return <main aria-busy="true">Loading Skill2Career…</main>;
  }

  return <LegacyPage key={pageKey} source={loadedPage.source} />;
}
