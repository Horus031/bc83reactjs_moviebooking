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
import { addMovieApi } from "../../services/movie.api";
import { useNavigate } from "react-router-dom";

const AddMoviePage = () => {
  const [imgPreview, setImgPreview] = useState(null);
  const navigate = useNavigate();

  const handleChangeFile = (info) => {
    const file = info.file.originFileObj;
    if (file && file.type?.startsWith("image")) {
      setImgPreview(URL.createObjectURL(file));
    }
    return file;
  };

  const onFinish = async (values) => {
    try {
      // Bảo vệ dữ liệu bắt buộc
      if (!values.hinhAnh || !values.hinhAnh.length) {
        message.error("Vui lòng chọn hình ảnh!");
        return;
      }
      const file = values.hinhAnh[0].originFileObj;
      if (!file) {
        message.error("File ảnh không hợp lệ!");
        return;
      }

      const formData = new FormData();
      formData.append("tenPhim", values.tenPhim?.trim() || "");
      formData.append("trailer", values.trailer?.trim() || "");
      formData.append("moTa", values.moTa?.trim() || "");

      // CyberSoft backend thường nhận "DD/MM/YYYY"
      formData.append(
        "ngayKhoiChieu",
        values.ngayKhoiChieu.format("DD/MM/YYYY")
      );

      // Ép về string để backend khỏi lỗi parse
      formData.append("dangChieu", String(!!values.dangChieu));
      formData.append("sapChieu", String(!!values.sapChieu));
      formData.append("hot", String(!!values.hot));
      formData.append("danhGia", String(values.danhGia ?? 0));

      // Nhóm – nếu list của bạn đang đọc GP01 thì cân nhắc dùng GP01 cho đồng bộ
      formData.append("maNhom", "GP01");

      // Append file KÈM TÊN FILE
      formData.append("File", file, file.name);

      await addMovieApi(formData);
      message.success("Thêm phim thành công!");
      // chuyển về danh sách nếu muốn:
      navigate("/admin/films");
    } catch (err) {
      // Log chi tiết để biết server trả gì
      console.error("Add movie error:", err?.response?.data || err);
      message.error(err?.response?.data?.content || "Thêm phim thất bại!");
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
            getValueFromEvent={(e) => e && e.fileList}
            rules={[{ required: true, message: "Vui lòng chọn hình ảnh!" }]}
          >
            <Upload
              name="hinhAnh"
              listType="picture"
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
