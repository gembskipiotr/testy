import { createSelector } from 'reselect';
import { prop, pipe, groupBy } from 'ramda';
import dayjs from 'dayjs';
import { selectOrders } from '../orders';
import { LANES } from './tasks.contants';
import { selectUserId } from '../auth/auth.selectors';
import { selectIsCompanyAdmin } from '../company/company.selectors';

export const selectTasksDomain = (state) => ({ ...state.tasks });

export const selectsTasksListByOrder = createSelector(
  selectTasksDomain, pipe(prop('tasksList'), groupBy(prop('orderId')))
);

export const selectsBoards = createSelector(
  selectsTasksListByOrder, selectOrders, selectUserId, selectIsCompanyAdmin,
  (tasksMap, orders, userId, isAdmin) => {
    return orders.asMutable().map(({ _id, name }) => {
      const lanes = { ...LANES };
      const tasks = tasksMap[_id] || [];
      const tasksGroupedByStatus = groupBy(prop('status'))(tasks);

      const fullFilledLanes = Object.values(lanes).map((lane) => {
        const laneData = { ...lane };
        laneData.cards = (tasksGroupedByStatus[lane.type] || []).map((task) => ({
          id: task._id,
          title: task.name,
          description: task.description,
          label: dayjs(task.endTime).format('DD.MM.YYYY'),
          metadata: task,
          draggable: isAdmin || userId === task.userId,
        }));
        return laneData;
      });
      return ({ _id, name, lanes: fullFilledLanes });
    });
  }
);
