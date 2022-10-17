import React, { useEffect } from "react";
import Overview from "../../pages/Overview";
import Sidebar from "../Sidebar";
import Stores from "../../pages/Stores";
import Employees from "../../pages/Employees";
import Products from "../../pages/Products";
import Warehouses from "../../pages/Warehouses";
import Order from "../../pages/Orders";
import Predict from "../../pages/Predict";
import Profile from "../../pages/Profile";
import NotFound from "../../pages/NotFound";
import Store from "../Store";
import { useRouteMatch, Switch, Route } from "react-router-dom";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { selectStore } from "../../redux/storeSlice";

const Dashboard = () => {
    let match = useRouteMatch();
    // const role = useSelector((state) => state.auth.user.role.slug);
    let user = useSelector((state) => state.auth.user);
    const stores = useSelector((state) => state.store.stores);
    stores.forEach((store) => {
        if (store.id === user.storeId) {
            user = { ...user, storeName: store.name };
        }
    });
    const dispatch = useDispatch();

    useEffect(() => {
        const currentStore = sessionStorage.getItem("auth") ? JSON.parse(sessionStorage.getItem("auth")).user.storeId : "";
        dispatch(selectStore(currentStore));
    }, [dispatch]);

    return (
        <>
            <Sidebar match={match} />
            <div className='main-content'>
                <main>
                    {user.role.slug === "giam-doc" ? <Store /> : <p>{user.storeName}</p>}
                    <Switch>
                        <Route exact path={`${match.url}`} component={Overview} />
                        <Route path={`${match.url}/predict`} component={Predict} />
                        <Route path={`${match.url}/orders`} component={Order} />
                        <Route path={`${match.url}/stores`} component={Stores} />
                        <Route path={`${match.url}/employees`} component={Employees} />
                        <Route path={`${match.url}/products`} component={Products} />
                        <Route path={`${match.url}/warehouses`} component={Warehouses} />
                        <Route path={`${match.url}/profile`} component={Profile} />
                        <Route path='/*' component={NotFound} />
                    </Switch>
                </main>
            </div>
        </>
    );
};

export default Dashboard;
