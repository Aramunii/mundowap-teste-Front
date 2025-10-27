import Swal from  'sweetalert2';

/**
 * Alerta de erro
 */
export const showError = (title: string, message: string) => {
  return Swal.fire({
    icon: 'error',
    title,
    text: message,
    confirmButtonText: 'OK',
    confirmButtonColor: '#e74c3c',
  });
};

/**
 * Alerta de sucesso
 */
export const showSuccess = (title: string, message: string) => {
  return Swal.fire({
    icon: 'success',
    title,
    text: message,
    confirmButtonText: 'OK',
    confirmButtonColor: '#27ae60',
    timer: 2000,
    timerProgressBar: true,
  });
};

/**
 * Alerta de aviso
 */
export const showWarning = (title: string, message: string) => {
  return Swal.fire({
    icon: 'warning',
    title,
    text: message,
    confirmButtonText: 'OK',
    confirmButtonColor: '#f39c12',
  });
};

/**
 * Alerta de confirmação
 */
export const showConfirm = (title: string, message: string) => {
  return Swal.fire({
    icon: 'question',
    title,
    text: message,
    showCancelButton: true,
    confirmButtonText: 'Sim',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#3498db',
    cancelButtonColor: '#95a5a6',
  });
};

/**
 * Alerta de informação
 */
export const showInfo = (title: string, message: string) => {
  return Swal.fire({
    icon: 'info',
    title,
    text: message,
    confirmButtonText: 'OK',
    confirmButtonColor: '#3498db',
  });
};

/**
 * Alerta customizado para erro de tempo insuficiente
 */
export const showTimeError = (
    availableMinutes: number,
    requiredMinutes: number,
    formatMinutes: (minutes: number) => string
) => {
    return Swal.fire({
        icon: 'error',
        title: 'Limite de horas excedido',
        html: `
            <div style="text-align:left; font-size:14px;">
                <p style="margin:8px 0;"><strong>Horas para realizar esta visita:</strong> ${formatMinutes(requiredMinutes)}</p>
                <p style="margin:8px 0;"><strong>Horas disponível:</strong> ${formatMinutes(availableMinutes)}</p>
                <p style="margin:8px 0;"><strong>Limite de horas máxima por dia:</strong> 8 horas</p>
            </div>
        `,
        confirmButtonText: 'Entendi',
        confirmButtonColor: '#e74c3c',
    });
};

/**
 * Toast (notificação pequena no canto)
 */
export const showToast = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'success') => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });

  return Toast.fire({
    icon: type,
    title: message
  });
};