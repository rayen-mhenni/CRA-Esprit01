import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Calendar,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  notification,
  Popconfirm,
  Row,
  Select,
  Upload,
} from "antd";
import moment from "moment";
import axios from "axios";
import FormItem from "antd/lib/form/FormItem";
import TextArea from "antd/lib/input/TextArea";
import { CloudUploadOutlined } from "@material-ui/icons";
import { useSelector } from "react-redux";
const initialvalues = {
  user: "",
  type: "",
  date: "",
  ClientFrais: false,
  justification: "",
  motif: "",
  HT: 0,
  TTC: 0,
  TVA: 0,
  MontantRemb: 0,
  TVADed: 0,
  Immobilisation: true,
};
const FraisModal = (props) => {
  const [form] = Form.useForm();
  const [loading, setloqding] = useState(false);
  const [buttonload, setbuttonload] = useState(false);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    props.create === true ? setloqding(false) : setloqding(true)
    if (props.create === false )
      axios
        .get(`/api/users/frais/${props?.record?._id}`)
        .then((res) => {
          form.setFieldsValue({
            ...res.data?.con,
            date: moment(res.data?.con.date),
          });
          setloqding(false);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [props.visible]);

  function handleOk(values) {
    setbuttonload(true);
    if (props.create === false)
      axios
        .put(`/api/users/frais/${props?.record?._id}`, {
          ...values,
          date: moment(values.date).format("YYYY/MM/DD"),
        })
        .then(() => {
          notification.success({ message: "Update Success" });
          props.onCancel();
          setbuttonload(false);
          form.resetFields();
        });
    else
      axios
        .post(`/api/users/frais`, {
          ...values,
          justification:values.justification.file.name,
          date: moment(values.date).format("YYYY/MM/DD"),
          user:auth.user.id
        })
        .then(() => {
          notification.success({ message: "Create Success" });
          props.onCancel();
          setbuttonload(false);
          form.resetFields();

        });
  }
  return (
    <Modal
      visible={props.visible}
      onCancel={() => {
        props.onCancel();
        form.resetFields();
      }}
      width="700px"
      footer={null}
    >
      <Form
        form={form}
        initialValues={initialvalues}
        onFinish={handleOk}
        name="frais"
      >
        <Card
          title={
            props.display ? (
              <p
                style={{
                  fontWeight: "bold",
                  color: "lightblue",
                  fontSize: "25px",
                  textAlign: "center",
                }}
              >
                Display Note de frais
              </p>
            ) : (
              <p
                style={{
                  fontWeight: "bold",
                  color: "lightblue",
                  fontSize: "25px",
                  textAlign: "center",
                }}
              >
                New Note de frais
              </p>
            )
          }
          extra={
            props.display ? null : (
              <Button
                key="submit"
                type="primary"
                htmlType="submit"
                loading={buttonload}
              >
                Update
              </Button>
            )
          }
          loading={loading}
        >
          <Row gutter={32}>
            <Col span={3}>Type :</Col>
            <Col span={7}>
              <FormItem name="type" rules={[{ required: true }]}>
                <Select>
                  <Select.Option value="NF">Notes De frais</Select.Option>
                  <Select.Option value="FR">Forfait repas</Select.Option>
                  <Select.Option value="TR">Ticket Resto</Select.Option>
                  <Select.Option value="FK">Frais kilometrique</Select.Option>
                  <Select.Option value="GD">Grand Deplacement</Select.Option>
                  <Select.Option value="FT">Frais de travail</Select.Option>
                </Select>
              </FormItem>
            </Col>

            <Col span={3}>Date :</Col>
            <Col span={7}>
              <FormItem name="date" rules={[{ required: true }]}>
                <DatePicker />
              </FormItem>
            </Col>
          </Row>
          <Row gutter={32}>
            <Col span={8}>Frais refacture a moin client :</Col>
            <Col>
              <FormItem
                name="ClientFrais"
                rules={[{ required: true }]}
                valuePropName="checked"
              >
                <Checkbox />
              </FormItem>
            </Col>

            <Col span={4}>Justificatif :</Col>
            <Col>
        
              <FormItem name="justification" shouldUpdate rules={[{ required: true }]}>
        
            
                <Upload
                  onChange={({ file, fileList }) => {
                    if (file.status !== "uploading") {
                      console.log("filee", file);

                      var bodyFormData = new FormData();

                      bodyFormData.append("image", file.originFileObj);

                      axios({
                        method: "post",
                        url: "/api/upload",
                        data: bodyFormData,
                        headers: { "Content-Type": "multipart/form-data" },
                      })
                        .then(function (response) {
                          //handle success
                          console.log(response);
                        })
                        .catch(function (response) {
                          //handle error
                          console.log(response);
                        });
                    }
                  }}
                  progress={{
                    strokeColor: {
                      "0%": "#108ee9",
                      "100%": "#87d068",
                    },
                    strokeWidth: 3,
                    format: (percent) => `${parseFloat(percent.toFixed(2))}%`,
                  }}
                >
                  <Button icon={<CloudUploadOutlined />}>Upload</Button>
                </Upload>
              </FormItem>
            </Col>
          </Row>
          <Row gutter={32}>
            <Col span={3}>Motif :</Col>
            <Col span={19}>
              <FormItem name="motif" rules={[{ required: true }]}>
                <TextArea rows={2} />
              </FormItem>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col>HT (€) :</Col>
            <Col span={4}>
              <FormItem name="HT" rules={[{ required: true }]}>
                <InputNumber addonAfter="€" />
              </FormItem>
            </Col>
            <Col>TTC (€) :</Col>
            <Col span={4}>
              <FormItem name="TTC" rules={[{ required: true }]}>
                <InputNumber addonAfter="€" />
              </FormItem>
            </Col>

            <Col>tva (€) :</Col>
            <Col span={4}>
              <FormItem name="TVA">
                <InputNumber addonAfter="€" />
              </FormItem>
            </Col>
          </Row>
          <Row gutter={32}>
            <Col>Montant remboursable :</Col>
            <Col span={5}>
              <FormItem name="MontantRemb">
                <InputNumber addonAfter="€" />
              </FormItem>
            </Col>

            <Col>Tva deductible (€) :</Col>
            <Col span={5}>
              <FormItem name="TVADed">
                <InputNumber addonAfter="€" />
              </FormItem>
            </Col>
          </Row>
        </Card>
      </Form>
    </Modal>
  );
};

export default FraisModal;
