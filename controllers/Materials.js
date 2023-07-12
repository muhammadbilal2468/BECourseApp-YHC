import Courses from "../models/CoursesModel.js";
import Materials from "../models/MaterialsModel.js";

export const getMaterials = async (req, res) => {
  const { uuid } = req.params;
  try {
    const otherCourse = await Courses.findOne({ where: { uuid } });

    if (!otherCourse) {
      return res.status(404).json({ error: "Materi tidak ditemukan" });
    }

    const otherCourseId = otherCourse.id;

    const resp = await Materials.findAll({
      attributes: ["uuid", "name", "description", "link", "courseId"],
      where: {
        courseId: otherCourseId,
      },
    });

    if (resp.length === 0)
      return res.status(404).json({ msg: "Materi Belum Ada" });

    res.status(200).json(resp);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getMaterialById = async (req, res) => {
  try {
    const material = await Materials.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!material)
      return res.status(404).json({ msg: "Materi Tidak Ditemukan" });

    const resp = await Materials.findOne({
      attributes: ["uuid", "name", "description", "duration", "courseId"],
      where: {
        uuid: req.params.id,
      },
    });

    res.status(200).json(resp);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createMaterial = async (req, res) => {
  const { name, description, link, courseId } = req.body;
  try {
    await Materials.create({
      name: name,
      description: description,
      link: link,
      courseId: courseId,
    });
    res.status(201).json({ msg: "Materi Berhasil Tambahkan" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ msg: error.message });
  }
};

export const updateMaterial = async (req, res) => {
  const material = await Materials.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!material) return res.status(404).json({ msg: "Materi Tidak Ditemukan" });

  const { name, description, link } = req.body;

  try {
    await Materials.update(
      {
        name: name,
        description: description,
        link: link,
      },
      {
        where: {
          id: material.id,
        },
      }
    );
    res.status(200).json({ msg: "Kursus Berhasil Diubah" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteMaterial = async (req, res) => {
  const material = await Materials.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!material) return res.status(404).json({ msg: "Materi Tidak Ditemukan" });

  try {
    await Materials.destroy({
      where: {
        id: material.id,
      },
    });
    res.status(200).json({ msg: "Materi Berhasil di Hapus" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
