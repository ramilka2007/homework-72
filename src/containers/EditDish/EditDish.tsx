import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { ApiDish } from '../../types';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectOneDish } from '../../store/dishesSlice';
import { fetchOneDish, updateDish } from '../../store/dishesThunk';
import Form from '../../components/Form/Form';

const EditDish = () => {
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const dish = useAppSelector(selectOneDish);

  const onSubmit = async (apiDish: ApiDish) => {
    try {
      await dispatch(updateDish({ id, apiDish })).unwrap();
      navigate('/admin/dishes');
      toast.success('Contact updated!');
    } catch (e) {
      toast.error('Could not update contact!');
    }
  };

  useEffect(() => {
    dispatch(fetchOneDish(id));
  }, [dispatch, id]);

  return (
    <div className="row mt-2">
      <div className="col">
        {dish && <Form onSubmit={onSubmit} existingDish={dish} />}
      </div>
    </div>
  );
};

export default EditDish;
