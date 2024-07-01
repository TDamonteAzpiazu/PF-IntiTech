declare module 'sweetalert2-react-content' {
    import swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';
    import { ReactElement } from 'react';
  
    export default function withReactContent(swal: typeof swal): {
      fire(options: SweetAlertOptions & { html: ReactElement }): Promise<SweetAlertResult>;
    };
  }
  