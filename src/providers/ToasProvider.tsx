
import { createContext, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, AlertState, removeAlert } from '../store/slice/alertSlice';
import { RootState } from '../store';

const initialContext = {
    notifySuccess: (alert: Alert) => { },
    notifyError: (alert: Alert) => { },
}

const ToastContext = createContext({
    ...initialContext
});

type Props = {
    children: React.ReactNode;
}

const ToastProvider = ({ children }: Props) => {

    const { list }: AlertState = useSelector((state: RootState) => state.alert);
 
    const dispatch = useDispatch();

    const notifySuccess = (alert: Alert, delay = 5000) => {
        dispatch(removeAlert(alert.id));
        toast.success(alert.msg, {});
    };

    const notifyError = (alert: Alert) => {
        dispatch(removeAlert(alert.id));
        toast.error(alert.msg, {});
    };

    useEffect(() => {
        list?.map((alert: Alert) => {
            let color = '';
            let icon = null;
            switch (alert.type) {
                case 'info':
                    color = 'blue';
                    icon = 'info';
                    break;
                case 'success':
                    notifySuccess(alert);
                    break;
                case 'error':
                    notifyError(alert);
                    break;
            }
        })

    }, [list])



    return (
        <ToastContext.Provider value={{ notifySuccess, notifyError }}>
            <Toaster />
            {children}
        </ToastContext.Provider>
    );
};

export default ToastProvider;
