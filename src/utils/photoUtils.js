export const getPhotoSrc = (p) => (p && typeof p === 'object' ? p.src : p);
export const getPhotoCaption = (p) => (p && typeof p === 'object' ? p.caption : '');
