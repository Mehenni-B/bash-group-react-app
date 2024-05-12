import { administrationActions } from './../store/slices/administration-slice';
import { useDispatch } from 'react-redux';
import { Administration } from '../models/_index';
import { serviceActions } from '../store/slices/service-slice';

class AdministrationViewModel {
    private dispatch = useDispatch();

    constructor() {
        this.selectId = this.selectId.bind(this);
        this.getList = this.getList.bind(this);
        this.dispatch = this.dispatch.bind(this);
    }

    public selectId(administrationId: number): void {
        this.dispatch(administrationActions.updateCurrentId(administrationId));
        this.dispatch(serviceActions.updateCurrent(null));
    }

    public async getList(): Promise<boolean> {
        const administrationsList = localStorage.getItem("administrationsList");
        const administrationsListTTL = localStorage.getItem("administrationsListTTL");
        const administrationsTTL = administrationsListTTL ? JSON.parse(administrationsListTTL) : 0;
        const administrations = administrationsList ? JSON.parse(administrationsList) : null;

        if (administrations && administrationsTTL && administrationsTTL > Date.now()) {
            this.dispatch(administrationActions.updateList(administrations));
            return true;
        }

        localStorage.removeItem("administrationsList");
        localStorage.removeItem("administrationsListTTL");

        const response = await Administration.getList();

        if (response.status === 200) {
            this.dispatch(administrationActions.updateList(response.data.data));
            localStorage.setItem("administrationsList", JSON.stringify(response.data.data));
            localStorage.setItem("administrationsListTTL", JSON.stringify(Date.now() + Administration.TTL));
            return true;
        } else
            return false;
    }
}

export default AdministrationViewModel;
