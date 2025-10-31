// Helper function to load showcase data from JSON
// Converts date strings to Date objects for proper sorting

export async function getShowcaseData() {
  // In Next.js, we can use fetch to load JSON from public folder
  const response = await fetch('/data/showcaseData.json');
  const data = await response.json();
  
  // Convert date strings to Date objects
  const showcaseData = data.showcaseData.map(item => ({
    ...item,
    dateObj: new Date(item.dateObj)
  }));
  
  return {
    showcaseData,
    categories: data.categories
  };
}
