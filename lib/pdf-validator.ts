/**
 * Validates if a PDF file is exactly 1 page
 */
export async function validatePdfPages(file: File): Promise<{ isValid: boolean; pageCount: number; error?: string }> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    
    reader.onload = async (e) => {
      try {
        const arrayBuffer = e.target?.result as ArrayBuffer
        
        // Convert to Uint8Array for PDF parsing
        const uint8Array = new Uint8Array(arrayBuffer)
        
        // Read PDF as text to find page count
        const text = new TextDecoder('latin1').decode(uint8Array)
        
        // PDF files contain /Count or /Type/Pages with count
        // Look for patterns like /Count 1 or /Count\s+(\d+)
        const countMatches = text.match(/\/Count\s+(\d+)/g)
        
        if (countMatches) {
          // Extract numbers from matches
          const counts = countMatches.map(match => {
            const numMatch = match.match(/\d+/)
            return numMatch ? parseInt(numMatch[0]) : 0
          })
          
          // Take the maximum count (usually the most accurate)
          const pageCount = Math.max(...counts.filter(c => c > 0))
          
          if (pageCount === 1) {
            resolve({ isValid: true, pageCount: 1 })
          } else {
            resolve({ 
              isValid: false, 
              pageCount, 
              error: `PDF must be exactly 1 page. Your document has ${pageCount} page${pageCount > 1 ? 's' : ''}.` 
            })
          }
        } else {
          // Fallback: Try alternative method - count /Page markers
          const pageMarkers = (text.match(/\/Type[\s\/]*Page[^s]/g) || []).length
          
          if (pageMarkers === 1) {
            resolve({ isValid: true, pageCount: 1 })
          } else if (pageMarkers > 0) {
            resolve({ 
              isValid: false, 
              pageCount: pageMarkers, 
              error: `PDF must be exactly 1 page. Your document appears to have ${pageMarkers} page${pageMarkers > 1 ? 's' : ''}.` 
            })
          } else {
            // If we can't determine, allow it but warn
            console.warn('Could not determine PDF page count, allowing submission')
            resolve({ isValid: true, pageCount: 1 })
          }
        }
      } catch (error) {
        console.error('Error validating PDF:', error)
        // On error, allow submission but log
        resolve({ isValid: true, pageCount: 1 })
      }
    }
    
    reader.onerror = () => {
      resolve({ isValid: false, pageCount: 0, error: 'Error reading PDF file' })
    }
    
    reader.readAsArrayBuffer(file)
  })
}

