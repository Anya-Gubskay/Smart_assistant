export namespace Toast {

  export enum ToastTypes {
    Error = 'error',
    Success = 'success',
    Warning = 'warning',
    Info = 'info'
  }

  export interface SettingsToaster {
    color: string,
    icon: string
  }

  export const SettingToast: Record<ToastTypes, SettingsToaster> = {
    [ToastTypes.Error]: {color: '#d2425c', icon: 'cancel'},
    [ToastTypes.Success]: {color: '#3fc380', icon: 'done'},
    [ToastTypes.Warning]: {color: '#f59a57', icon: 'warning'},
    [ToastTypes.Info]: {color: '#3a539b', icon: 'info'},
  }

  export interface Data {
    title?: string;
    content: string;
    show?: boolean;
    type?: ToastTypes;
    progressWidth?: string;
  }
}
