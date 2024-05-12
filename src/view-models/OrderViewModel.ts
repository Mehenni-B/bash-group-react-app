import { orderActions } from './../store/slices/order-slice';
import { useDispatch } from 'react-redux';
import { Order } from '../models/_index';
import { FetchOrderListType, StoreOrderType } from '../models/Order';


const defaultErrorMessage = {
    title: "خطأ",
    message: "حدث خطأ. يرجى المحاولة مرة أخرى.",
    status: "error",
};

class OrderViewModel {
    private dispatch = useDispatch();

    constructor() {
        this.save = this.save.bind(this);
        this.store = this.store.bind(this);
        this.getList = this.getList.bind(this);
        this.getDetails = this.getDetails.bind(this);
        this.dispatch = this.dispatch.bind(this);
    }

    public async save(order: StoreOrderType) {
        this.dispatch(orderActions.updateCurrent(order));
    }

    public async store(order: any): Promise<boolean> {
        this.dispatch(orderActions.updateError(null));

        const response = await Order.store(order);
        console.log(response);

        if (response.status === 200) {
            this.dispatch(orderActions.updatePaymentId(response.data.data.transaction_id ?? ''));
            return true;
        } else if (response.status === 422) {
            this.dispatch(orderActions.updateError(response.data.message));
        } else {
            this.dispatch(orderActions.updateError(defaultErrorMessage.message));
        }

        return false;
    }

    public async getList(data: FetchOrderListType): Promise<boolean> {
        this.dispatch(orderActions.updateList(null));

        const response = await Order.getList(data);

        if (response.status === 200) {
            this.dispatch(orderActions.updateList(response.data.data));
            return true;
        } else
            return false;
    }

    public async getDetails(orderId: number): Promise<boolean> {
        this.dispatch(orderActions.updateSelected(null));

        const response = await Order.getDetails(orderId);
        console.log(response);
        if (response.status === 200) {
            this.dispatch(orderActions.updateSelected(response.data.data));
            return true;
        } else
            return false;
    }
}

export default OrderViewModel;
