
// export function getFileType(filename: string): string | null {
//     console.log(filename)
//     const extension = filename.split('.').pop()?.toLowerCase();

//     if (extension) {
//         switch (extension) {
//             case 'mp4':
//             case 'avi':
//             case 'mov':
//             case 'mkv':
//                 return 'video';

//             case 'jpg':
//             case 'jpeg':
//             case 'png':
//             case 'gif':
//                 return 'image';

//             case 'mp3':
//             case 'wav':
//             case 'ogg':
//                 return 'audio';

//             case 'txt':
//             case 'pdf':
//             case 'doc':
//             case 'docx':
//                 return 'document';

//             // Add more cases as needed for other file types

//             default:
//                 return 'unknown';
//         }
//     }

//     return 'folder'; // null for  
// }