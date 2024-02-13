type MediaType = 'track' | 'image' | 'video'

export const normalizeURL = (fileName: string, type: MediaType) => {
	if (type === 'track') {
		return `http://localhost:3000/uploads/track/${fileName}`
	} else if (type === 'image') {
		return `http://localhost:3000/uploads/image/${fileName}`
	} else {
		return `http://localhost:3000/uploads/video/${fileName}`
	}
}
