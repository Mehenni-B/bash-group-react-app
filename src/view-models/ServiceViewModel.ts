import { serviceActions } from './../store/slices/service-slice';
import { useDispatch } from 'react-redux';
import { Service } from '../models/_index';


class ServiceViewModel {
    private dispatch = useDispatch();

    constructor() {
        this.getList = this.getList.bind(this);
        this.getDetails = this.getDetails.bind(this);
        this.dispatch = this.dispatch.bind(this);
    }

    public async getList(administrationId: number): Promise<boolean> {
        this.dispatch(serviceActions.updateList(null));

        const response = await Service.getList(administrationId);

        if (response.status === 200) {
            this.dispatch(serviceActions.updateList(response.data.data));
            return true;
        } else
            return false;
    }

    public async getDetails(serviceId: number): Promise<boolean> {
        this.dispatch(serviceActions.updateCurrent(null));

        const response = await Service.getDetails(serviceId);
        console.log(response);
        if (response.status === 200) {
            this.dispatch(serviceActions.updateCurrent(response.data.data));
            return true;
        } else
            return false;
    }
}

export default ServiceViewModel;
