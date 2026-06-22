try {
  var savedTheme = localStorage.getItem('theme');
  var themePref = savedTheme || 'system';
  document.documentElement.setAttribute('data-theme-preference', themePref);
  
  var theme = savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  
  var brand = localStorage.getItem('brand') || 'ecare';
  document.documentElement.setAttribute('data-brand', brand);
} catch (e) {}
