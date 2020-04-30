import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { pipe, prop, equals, complement } from 'ramda';

export const { Types: OrdersTypes, Creators: OrdersActions } = createActions(
  {
    createOrder: ['name', 'users', 'onFinish'],
    createOrderSuccess: ['order'],
    updateOrder: ['orderId', 'name', 'users', 'onFinish'],
    updateOrderSuccess: ['order'],
    removeOrder: ['orderId'],
    removeOrderSuccess: ['orderId'],
    getOrders: [],
    getOrdersSuccess: ['orders'],
  },
  { prefix: 'ORDERS/' }
);

export const INITIAL_STATE = new Immutable({
  ordersList: [],
});

export const createOrderSuccess = (state, { order }) => {
  return state.set('ordersList', state.ordersList.concat(order));
};

export const removeOrderSuccess = (state, { orderId }) => {
  const hasId = pipe(prop('_id'), equals(orderId));
  return state.set('ordersList', state.ordersList.filter(complement(hasId)));
};

export const updateOrderSuccess = (state, { order }) => {
  const hasId = pipe(prop('_id'), equals(order._id));
  const orderIndex = state.ordersList.findIndex(hasId);
  return state.set('ordersList', state.ordersList.map((orderItem, index) => {
    if (index === orderIndex) {
      return order;
    }
    return orderItem;
  }));
};

export const getOrdersSuccess = (state, { orders }) => {
  return INITIAL_STATE.set('ordersList', orders);
};

export const reducer = createReducer(INITIAL_STATE, {
  [OrdersTypes.CREATE_ORDER_SUCCESS]: createOrderSuccess,
  [OrdersTypes.REMOVE_ORDER_SUCCESS]: removeOrderSuccess,
  [OrdersTypes.UPDATE_ORDER_SUCCESS]: updateOrderSuccess,
  [OrdersTypes.GET_ORDERS_SUCCESS]: getOrdersSuccess,
});
