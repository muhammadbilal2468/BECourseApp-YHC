import { Op } from "sequelize";
import Courses from "../models/CoursesModel.js";

export const getCourses = async (req, res) => {
  try {
    const { search } = req.query;

    const whereClause = {};

    if (search) {
      whereClause.name = { [Op.like]: `%${search}%` };
    }

    const resp = await Courses.findAll({
      attributes: [
        "id",
        "uuid",
        "name",
        "description",
        "duration",
        "price",
        "color",
      ],
      where: whereClause,
    });

    if (resp.length === 0)
      return res.status(404).json({ msg: "Kursus Belum Ada" });

    res.status(200).json(resp);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const course = await Courses.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!course) return res.status(404).json({ msg: "Kursus Tidak Ditemukan" });

    const resp = await Courses.findOne({
      attributes: ["id", "uuid", "name", "description", "duration", "price"],
      where: {
        uuid: req.params.id,
      },
    });

    res.status(200).json(resp);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createCourse = async (req, res) => {
  const { name, description, duration, price, color } = req.body;

  try {
    if (!name || !description || !duration || !price || !color) {
      throw new Error("Mohon isi semua kolom yang diperlukan");
    }

    await Courses.create({
      name: name,
      description: description,
      duration: duration,
      price: price,
      color: color,
    });
    res.status(201).json({ msg: "Kursus Berhasil Tambahkan" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ msg: error.message });
  }
};

export const updateCourse = async (req, res) => {
  const course = await Courses.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!course) return res.status(404).json({ msg: "Kursus Tidak Ditemukan" });

  const { name, description, duration, price, color } = req.body;

  try {
    await Courses.update(
      {
        name: name,
        description: description,
        duration: duration,
        duration: duration,
        price: price,
        color: color,
      },
      {
        where: {
          id: course.id,
        },
      }
    );
    res.status(200).json({ msg: "Kursus Berhasil Diubah" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteCourse = async (req, res) => {
  const course = await Courses.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!course) return res.status(404).json({ msg: "Kurses Tidak Ditemukan" });

  try {
    await Courses.destroy({
      where: {
        id: course.id,
      },
    });

    res.status(200).json({ msg: "Kursus Berhasil di Hapus" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
