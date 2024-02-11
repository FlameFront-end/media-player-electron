type MediaType = 'track' | 'image'

export const normalizeURL = (fileName: string, type: MediaType) => {
	if (type === 'track') {
		return `http://localhost:3000/uploads/track/${fileName}`
	} else {
		return `http://localhost:3000/uploads/image/${fileName}`
	}
}
