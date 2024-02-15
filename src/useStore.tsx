import { create } from 'zustand'

interface FileData {
  name: string;
  file: File;
  isActive: boolean;
}

interface FilesState {
  id: number;
  files: { [key: string]: FileData };
  addFile: (file: FileData ) => void;
  setActive: (id: number | string) => void;
}

const useStore = create<FilesState>((set) => ({
  id:1,
  files: {},
  addFile: (file) => set((state) => {
    if (Object.keys(state.files).length >= 10) {
      console.log('Reached max number of markers.');
      return { files: { ...state.files } };
    }
    const newFile: FileData = {
      ...file,
      isActive: state.id === 1,
    };

    return { files: { ...state.files, [state.id]: newFile }, id: state.id + 1 };
  }),
  setActive: (id) => set((state) => {
    const updatedFiles = {} as { [key: string]: FileData };

    for (const fileId of Object.keys(state.files)) {
      updatedFiles[fileId] = {
        ...state.files[fileId],
        isActive: fileId === id,
      };
    }
    console.log(state.files)
    return { files: updatedFiles };
  })
}));

export default useStore;