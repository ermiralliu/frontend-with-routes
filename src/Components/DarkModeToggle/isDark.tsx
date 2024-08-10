export function isDark(){
  return JSON.parse(localStorage.getItem('darkMode') ?? 'true') as boolean;
}