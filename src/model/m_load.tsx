export default function loadSavedData() {
  console.log('Start saved data loading...')
  const rawSavedData = localStorage.getItem('savedData')
  if (rawSavedData) {
    const savedData = JSON.parse(rawSavedData)
    console.log(savedData)
    console.log('Saved data loaded successfully.')
    return true
  }
  console.log('Saved data not loaded.')
  return false
}
