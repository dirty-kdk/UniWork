import Application from '../models/applicationModel.js';
import Job from '../models/jobModel.js';

// @desc    Получение всех заявок пользователя
// @route   GET /api/applications
// @access  Private
export const getUserApplications = async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user._id })
      .populate('job', 'title department type')
      .sort({ appliedDate: -1 });

    res.json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// @desc    Создание новой заявки
// @route   POST /api/applications
// @access  Private
export const createApplication = async (req, res) => {
  try {
    const { jobId } = req.body;

    // Проверяем, существует ли вакансия
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Вакансия не найдена' });
    }

    // Проверяем, не подавал ли пользователь уже заявку на эту вакансию
    const existingApplication = await Application.findOne({
      user: req.user._id,
      job: jobId,
    });

    if (existingApplication) {
      return res.status(400).json({ message: 'Вы уже подали заявку на эту вакансию' });
    }

    // Создаем новую заявку
    const application = await Application.create({
      user: req.user._id,
      job: jobId,
      status: 'pending',
      appliedDate: Date.now(),
    });

    if (application) {
      const populatedApplication = await Application.findById(application._id).populate(
        'job',
        'title department type'
      );
      res.status(201).json(populatedApplication);
    } else {
      res.status(400).json({ message: 'Недопустимые данные заявки' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// @desc    Получение заявки по ID
// @route   GET /api/applications/:id
// @access  Private
export const getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id).populate(
      'job',
      'title department type description'
    );

    // Проверяем, принадлежит ли заявка текущему пользователю
    if (application && application.user.toString() === req.user._id.toString()) {
      res.json(application);
    } else {
      res.status(404).json({ message: 'Заявка не найдена' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// @desc    Отмена заявки
// @route   DELETE /api/applications/:id
// @access  Private
export const cancelApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    // Проверяем, принадлежит ли заявка текущему пользователю
    if (application && application.user.toString() === req.user._id.toString()) {
      await application.deleteOne();
      res.json({ message: 'Заявка отменена' });
    } else {
      res.status(404).json({ message: 'Заявка не найдена' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
}; 