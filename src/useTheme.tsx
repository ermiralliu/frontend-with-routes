export default function makeTheme(state: {darkMode: boolean|null} | null){
  console.log(state?.darkMode ?? 'gotta take it from localStorage');
  const nextBodyClass = isDark(state) ? 'dark'  : 'light'
  if(document.body.className != nextBodyClass)
    document.body.className = nextBodyClass;
}

export function isDark(state: {darkMode: boolean|null} | null){
  return state?.darkMode ?? JSON.parse(localStorage.getItem('darkMode') ?? 'true') as boolean;
}