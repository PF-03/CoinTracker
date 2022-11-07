import reminder from '../models/Reminder';

export const getReminders = async (req: any, res: any, next: any) => {
  await reminder
    .find({ user: req.body.user })
    .then((result: Object[]) => {
      res.send(result);
    })
    .catch((err: Error) => {
      next(err);
    });
};

export const addReminder = async (req: any, res: any) => {
  await reminder
    .create(req.body)
    .then((result: Object) => {
      res.status(201).send(result);
    })
    .catch((err: Error) => {
      res.status(400).send(err.message);
    });
};

export const updateReminder = async (req: any, res: any, next: any) => {
  const { _id } = req.body;

  const updatedReminder = {
    user: req.body.user,
    user_email: req.body.user_email,
    token_price: req.body.token_price,
    fullfilled: req.body.fullfilled,
    readed: req.body.readed,
  };

  await reminder
    .replaceOne({ _id: _id }, updatedReminder)
    .then((result: Object) => {
      res.status(201).send(result);
    })
    .catch((err: Error) => {
      next(err);
    });
};

export const deleteReminder = async (req: any, res: any, next: any) => {
  const { id } = req.query;

  await reminder
    .findOneAndDelete({ _id: id })
    .then((result: any) => {
      res.status(201).send(result);
    })
    .catch((err: Error) => {
      next(err);
    });
};
