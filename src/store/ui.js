import { create } from 'zustand'

const useUIStore = create((set) => ({
  isTrailEnabled: false,
  toggleTrail: () =>
    set((state) => ({ isTrailEnabled: !state.isTrailEnabled })),
}))

export default useUIStore
