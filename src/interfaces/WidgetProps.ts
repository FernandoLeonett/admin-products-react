export default interface WidgetProps {
  sources?: string[];
  sourceKeys?: any;
  resourceType?: string;
  cloudName: string;
  uploadPreset: string;
  buttonText?: any;
  style?: any;
  widgetStyles?: any;
  folder?: any;
  cropping?: boolean;
  generateSignatureUrl?: any;
  onSuccess?: any;
  onFailure?: any;
  logging?: boolean;
  customPublicId?: any;
  eager?: any;
  apiKey: string;
  accepts?: string;
  contentType?: string;
  withCredentials?: boolean;
  use_filename?: boolean;
  unique_filename?: boolean;
  googleDriveClientId?: any;
  multiple?: boolean;
  buttonType?: string;
  destroy?: boolean;
  autoClose?: boolean;
  maxFileSize?: number;
  max_files: number;
  language?: string;
  text?: any;
  btnClassName?: string;
  onCloseWidget?: (result: any) => void;
  onloadWdiget?: () => void;
}