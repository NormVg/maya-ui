import { ref } from 'vue'

export interface ToastOptions {
  title: string
  description?: string
  intent?: 'default' | 'success' | 'warning' | 'danger' | 'info'
  duration?: number
  icon?: any
  action?: { label: string; onClick: () => void }
}

export interface Toast extends ToastOptions {
  id: string
  visible: boolean
  height: number
}

const toasts = ref<Toast[]>([])
let toastCount = 0

const TOAST_LIMIT = 5
const TOAST_REMOVE_DELAY = 4000

export function useToast() {
  function addToast(options: ToastOptions) {
    const id = `toast-${++toastCount}`

    const toast: Toast = {
      id,
      ...options,
      visible: true,
      height: 0,
    }

    // Add to front of array (newest first)
    toasts.value = [toast, ...toasts.value].slice(0, TOAST_LIMIT)

    // Auto dismiss
    if (options.duration !== Infinity) {
      setTimeout(() => {
        dismissToast(id)
      }, options.duration || TOAST_REMOVE_DELAY)
    }

    return id
  }

  function dismissToast(id: string) {
    const ts = toasts.value.find(t => t.id === id)
    if (ts) {
      ts.visible = false
      // Wait for exit animation to complete before removing from array
      setTimeout(() => {
        toasts.value = toasts.value.filter(t => t.id !== id)
      }, 400) // matches our bouncy exit duration
    }
  }

  function updateToastHeight(id: string, height: number) {
    const ts = toasts.value.find(t => t.id === id)
    if (ts) ts.height = height
  }

  return {
    toasts,
    toast: addToast,
    dismiss: dismissToast,
    updateHeight: updateToastHeight
  }
}
