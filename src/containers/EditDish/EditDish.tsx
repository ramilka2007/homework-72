import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { ApiDish } from '../../types';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectFetchOneDishLoading,
  selectOneDish,
  selectUpdateDishLoading,
} from '../../store/dishesSlice';
import { fetchOneDish, updateDish } from '../../store/dishesThunk';
import DishForm from '../../components/DishForm/DishForm';
import Spinner from '../../components/Spinner/Spinner';

const EditDish = () => {
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const isFetching = useAppSelector(selectFetchOneDishLoading);
  const isUpdating = useAppSelector(selectUpdateDishLoading);
  const dish = useAppSelector(selectOneDish);

  const onSubmit = async (apiDish: ApiDish) => {
    try {
      await dispatch(updateDish({ id, apiDish })).unwrap();
      navigate('/admin/dishes');
      toast.success('Dish updated!');
    } catch (e) {
      toast.error('Could not update dish!');
    }
  };

  useEffect(() => {
    dispatch(fetchOneDish(id));
  }, [dispatch, id]);

  return (
    <div className="row mt-2">
      <div className="col">
        {isFetching && <Spinner />}
        {dish && (
          <DishForm
            onSubmit={onSubmit}
            existingDish={dish}
            isLoading={isUpdating}
          />
        )}
      </div>
    </div>
  );
};

export default EditDish;
