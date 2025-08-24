import React, { useState } from "react";
import {
  Button,
  DatePicker,
  Input,
  Switch,
  Form,
  InputNumber,
  Upload,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import moment from "moment";
import { addMovieApi } from "../../services/movie.api";

const AddMoviePage = () => {
  const [imgPreview, setImgPreview] = useState(null);

  const handleChangeFile = (info) => {
    const file = info.file.originFileObj;
    if (file && file.type.startsWith("image")) {
      setImgPreview(URL.createObjectURL(file));
    }
    return file;
  };

  const onFinish = async (values) => {
    try {
      const formData = new FormData();
      formData.append("tenPhim", values.tenPhim);
      formData.append("trailer", values.trailer);
      formData.append("moTa", values.moTa);
      formData.append(
        "ngayKhoiChieu",
        values.ngayKhoiChieu.format("DD/MM/YYYY")
      );
      formData.append("dangChieu", values.dangChieu);
      formData.append("sapChieu", values.sapChieu);
      formData.append("hot", values.hot);
      formData.append("danhGia", values.danhGia);
      formData.append("maNhom", "GP00");
      formData.append("hinhAnh", values.hinhAnh.file.originFileObj);

      await addMovieApi(formData);
      message.success("Thêm phim thành công!");
    } catch (err) {
      console.error(err);
      message.error("Thêm phim thất bại!");
    }
  };

  return (
    <div className="p-5 ml-[200px]">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">🎬 Thêm phim mới</h2>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Tên phim"
            name="tenPhim"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Trailer"
            name="trailer"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Mô tả" name="moTa" rules={[{ required: true }]}>
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            label="Ngày khởi chiếu"
            name="ngayKhoiChieu"
            rules={[{ required: true }]}
          >
            <DatePicker format="DD/MM/YYYY" />
          </Form.Item>

          <Form.Item
            label="Đang chiếu"
            name="dangChieu"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item label="Sắp chiếu" name="sapChieu" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Form.Item label="Hot" name="hot" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Form.Item
            label="Đánh giá"
            name="danhGia"
            rules={[{ required: true }]}
          >
            <InputNumber min={1} max={10} />
          </Form.Item>

          <Form.Item
            label="Hình ảnh"
            name="hinhAnh"
            valuePropName="file"
            rules={[{ required: true }]}
          >
            <Upload
              maxCount={1}
              accept="image/*"
              beforeUpload={() => false}
              onChange={handleChangeFile}
            >
              <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
            </Upload>
          </Form.Item>

          {imgPreview && (
            <img src={imgPreview} alt="preview" className="w-32 mt-2" />
          )}

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Thêm phim
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddMoviePage;
