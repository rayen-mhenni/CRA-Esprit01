import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  notification,
  Row,
  Select,
  Steps,
  Tag,
} from "antd";
import FormItem from "antd/lib/form/FormItem";
import TextArea from "antd/lib/input/TextArea";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { CheckOutlined } from "@material-ui/icons";
const { Option } = Select;

const { Step } = Steps;

const CardContrat = (props) => {
  const [form] = Form.useForm();
  const [loading, setloqding] = useState(false);
  const [buttonload, setbuttonload] = useState(false);
  const [create, setcreate] = useState(false);
  const auth = useSelector((state) => state.auth);
  const [current, setCurrent] = useState(0);
  const [data, setdata] = useState({});
  const [isAdmin, setisAdmin] = useState(false);
  const [listuser, setlistuser] = useState([]);
  const [id, setid] = useState(auth.user.id);

  const steps = [
    {
      title: "Prestation de service",
    },
    {
      title: "Facturation",
    },
  ];
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  useEffect(() => {
    if (typeof window !== "undefined"&&window.localStorage.getItem("isAdmin") === "true") {
      setisAdmin(true);

      axios
        .get(`/api/users/Users/List`)
        .then((res) => {
          setlistuser(res?.data?.user ?? []);
        })
        .catch((err) => {
          notification.error({
            message: "something is wrong",
            description: err,
          });
        });
    }
    setloqding(true);
    async function callapi() {
      await axios
        .get(`/api/users/Contracts/List/${id}`)
        .then((res) => {
          console.log("response", res.data?.con[0]);
          if (res.data?.con?.length !== 0)
            form.setFieldsValue({
              ...res.data?.con[0],
              createdAt: moment(res.data?.con.createdAt),
              dateFin: moment(res.data?.con.dateFin),
              dateDebut: moment(res.data?.con.dateDebut),
              updatedAt: moment(res.data?.con.updatedAt),
            });
          else form.resetFields();
          setloqding(false);
          if (res.data?.con.length === 0) setcreate(true);
        })
        .catch((err) => {
          notification.error({
            message: "something is wrong with Contract",
          });
          setloqding(false);
        });
    }
    callapi();
  }, [id]);
  const userSelect = (
    <Select
      style={{ width: "25vw" }}
      defaultValue={id}
      onChange={(e) => setid(e)}
    >
      {listuser.map((user) => (
        <Option key={user._id} value={user._id}>
          {user.name} &nbsp;-&nbsp; {user.email}
        </Option>
      ))}
    </Select>
  );
  async function handleOk(values) {
    setbuttonload(true);
    if (create)
      await axios
        .post(`/api/users/Contracts`, {
          ...data,
          ...values,
          createdAt: moment(values.createdAt).format("YYYY/MM/DD"),
          dateFin: moment(values.dateFin).format("YYYY/MM/DD"),
          dateDebut: moment(values.dateDebut).format("YYYY/MM/DD"),
          updatedAt: moment(values.updatedAt).format("YYYY/MM/DD"),
          user: id,
        })
        .then(() => {
          notification.success({ message: "Create Success" });
          setbuttonload(false);
        });
    else
      await axios
        .put(`/api/users/Contracts/${form.getFieldValue("_id")}`, {
          ...data,
          ...values,
          createdAt: moment(values.createdAt).format("YYYY/MM/DD"),
          dateFin: moment(values.dateFin).format("YYYY/MM/DD"),
          dateDebut: moment(values.dateDebut).format("YYYY/MM/DD"),
          updatedAt: moment(values.updatedAt).format("YYYY/MM/DD"),
          user: id,
        })
        .then(() => {
          notification.success({ message: "Update Success" });
          setbuttonload(false);
        });
    setdata({
      ...data,
      ...values,
      _id: form.getFieldValue("_id"),
      createdAt: moment(values.createdAt).format("YYYY/MM/DD"),
      dateFin: moment(values.dateFin).format("YYYY/MM/DD"),
      dateDebut: moment(values.dateDebut).format("YYYY/MM/DD"),
      updatedAt: moment(values.updatedAt).format("YYYY/MM/DD"),
    });
    setCurrent(2);
  }
  const handleValidate = async () => {
    await axios
      .put(`/api/users/Contracts/${form.getFieldValue("_id")}`, {
        ...data,
        ...form.getFieldsValue(),
        Status: "Validate",
        user: id,
      })
      .then(() => {
        form.setFieldsValue({
          ...data,
          ...form.getFieldsValue(),
          Status: "Validate",
          user: id,
        });
        notification.success({ message: "Contract Validated" });
      });
  };
  return (
    <Form form={form} onFinish={handleOk} name="contract">
      <Card style={{ backgroundColor: "#0077b6" }}>
        <p style={{ textAlign: "center", color: "#ffffff", fontSize: "30px" }}>
          Détails du contrat{" "}
          <Tag color="blue">{form.getFieldValue("Status")}</Tag>
          <br />
          {isAdmin === true && userSelect}
        </p>
        {isAdmin && (
          <Button icon={<CheckOutlined/>} onClick={() => handleValidate()}>Validate contrat</Button>
        )}
        <br />

        <Steps current={current} style={{ width: "30vw", textAlign: "center" }}>
          {steps.map((item) => (
            <Step
              key={item.title}
              title={item.title}
              style={{ left: "20vw" }}
            />
          ))}
        </Steps>

        <br />
        {current === 0 && (
          <Card
            title={
              <p style={{ color: "#0077b6", fontSize: "20px" }}>
                Prestation de service
              </p>
            }
            style={{ paddingRight: "0px" }}
            loading={loading}
          >
            <Row gutter={32}>
              <Col span={3}>Type de contrat </Col>
              <Col span={7}>
                <FormItem name="type" rules={[{ required: true }]}>
                  <Select allowClear>
                    <Select.Option value="CONSERV">
                      Contrat de Service
                    </Select.Option>
                    <Select.Option value="CDI">
                      Contract Durée indeterminée
                    </Select.Option>
                    <Select.Option value="CDD">
                      Contrat Durée Déterminé
                    </Select.Option>
                    <Select.Option value="CONFEES">
                      Contrat de Fees
                    </Select.Option>
                  </Select>
                </FormItem>
              </Col>

              <Col span={3}>Client </Col>
              <Col span={7}>
                <FormItem name="Client" rules={[{ required: true }]}>
                  <Select>
                    <Select.Option value="BEN">Ben Jemaa</Select.Option>
                    <Select.Option value="LER">Leroix</Select.Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
            <Row gutter={32}>
              <Col span={3}>Date de début</Col>
              <Col span={7}>
                <FormItem name="dateDebut" rules={[{ required: true }]}>
                  <DatePicker style={{ width: "100%" }} />
                </FormItem>
              </Col>
              <Col span={3}>Date de fin</Col>
              <Col span={7}>
                <FormItem name="dateFin" rules={[{ required: true }]}>
                  <DatePicker style={{ width: "100%" }} />
                </FormItem>
              </Col>
            </Row>
            <Row gutter={32}>
              <Col span={3}>Description de la mission </Col>
              <Col span={17}>
                <FormItem name="Description" rules={[{ required: true }]}>
                  <TextArea rows={2} />
                </FormItem>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={3}>Lieu du service </Col>
              <Col span={17}>
                <FormItem name="LieuServ" rules={[{ required: true }]}>
                  <TextArea rows={1} />
                </FormItem>
              </Col>
            </Row>
            <Row gutter={32}>
              <Col span={3}>N° de rue</Col>
              <Col span={7}>
                <FormItem name="NumRue">
                  <InputNumber style={{ width: "100%" }} />
                </FormItem>
              </Col>

              <Col span={3}>Nom de rue </Col>
              <Col span={7}>
                <FormItem name="NomRue">
                  <Input
                    style={{
                      width: "100%",
                      height: " 30px",
                      padding: "0 11px",
                      textAlign: "left",
                      backgroundColor: "transparent",
                      borderRadius: "2px",
                      outline: 0,
                      border: "1px solid #d9d9d9",
                    }}
                  />
                </FormItem>
              </Col>
            </Row>
            <Row gutter={32}>
              <Col span={3}>code Postal</Col>
              <Col span={7}>
                <FormItem name="code">
                  <Input
                    style={{
                      width: "100%",
                      height: " 30px",
                      padding: "0 11px",
                      textAlign: "left",
                      backgroundColor: "transparent",
                      borderRadius: "2px",
                      outline: 0,
                      border: "1px solid #d9d9d9",
                    }}
                  />
                </FormItem>
              </Col>

              <Col span={3}>Ville </Col>
              <Col span={7}>
                <FormItem name="Ville">
                  <Input
                    style={{
                      width: "100%",
                      height: " 30px",
                      padding: "0 11px",
                      textAlign: "left",
                      backgroundColor: "transparent",
                      borderRadius: "2px",
                      outline: 0,
                      border: "1px solid #d9d9d9",
                    }}
                  />
                </FormItem>
              </Col>
            </Row>
            <Row gutter={32}>
              <Col span={3}>Paye</Col>
              <Col span={17}>
                <FormItem name="Pays">
                  <Input
                    style={{
                      width: "100%",
                      height: " 30px",
                      padding: "0 11px",
                      textAlign: "left",
                      backgroundColor: "transparent",
                      borderRadius: "2px",
                      outline: 0,
                      border: "1px solid #d9d9d9",
                    }}
                  />
                </FormItem>
              </Col>
            </Row>
          </Card>
        )}
        {current === 1 && (
          <Card
            title={
              <p style={{ color: "#0077b6", fontSize: "20px" }}>Facturation</p>
            }
            style={{ paddingRight: "0px" }}
            loading={loading}
          >
            <Row gutter={32}>
              <Col span={3}>Délai de paiement </Col>
              <Col span={7}>
                <FormItem
                  name="Fact_delaiDePayement"
                  rules={[{ required: true }]}
                >
                  <Select allowClear>
                    <Select.Option value="2M">Deux Mois</Select.Option>
                    <Select.Option value="1Y">Une année</Select.Option>
                  </Select>
                </FormItem>
              </Col>

              <Col span={3}>Mode d'envoi (des factures) </Col>
              <Col span={7}>
                <FormItem name="Fact_ModeDenvoi" rules={[{ required: true }]}>
                  <Select>
                    <Select.Option value="MAIL">Email</Select.Option>
                    <Select.Option value="COL">Colis</Select.Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
            <Row gutter={32}>
              <Col span={3}>Condition tarifaires </Col>
              <Col span={7}>
                <FormItem name="Fact_conditions">
                  <TextArea rows={4} />
                </FormItem>
              </Col>

              <Col span={3}>Procédure de facturation </Col>
              <Col span={7}>
                <FormItem name="Fact_procedure">
                  <TextArea rows={4} />
                </FormItem>
              </Col>
            </Row>
          </Card>
        )}
        {current === 2 && (
          <Row gutter={32}>
            <Col span={12}>
              <Card
                title={
                  <p style={{ color: "#0077b6", fontSize: "20px" }}>
                    Prestation de service
                  </p>
                }
                style={{ paddingRight: "0px" }}
              >
                <Row gutter={32}>
                  <Col span={8}>N° du contrat </Col>
                  <Col span={14}>{data._id}</Col>
                </Row>
                <Row gutter={32}>
                  <Col span={8}>Client </Col>
                  <Col span={14}>
                    <p style={{ color: "blue" }}>{data.Client}</p>
                  </Col>
                </Row>
                <Row gutter={32}>
                  <Col span={8}>Date de debut </Col>
                  <Col span={14}>{data.dateDebut}</Col>
                </Row>
                <Row gutter={32}>
                  <Col span={8}>Date de fin </Col>
                  <Col span={14}>{data.dateFin}</Col>
                </Row>
                <Row gutter={32}>
                  <Col span={8}>Description de la mission </Col>
                  <Col span={14}>{data.Description}</Col>
                </Row>
                <Row gutter={32}>
                  <Col span={8}>Lieu de service</Col>
                  <Col span={14}>{data.LieuServ}</Col>
                </Row>
              </Card>
            </Col>
            <Col span={12}>
              <Card
                title={
                  <p style={{ color: "#0077b6", fontSize: "20px" }}>
                    Facturation
                  </p>
                }
                style={{ paddingRight: "0px" }}
              >
                <Row gutter={32}>
                  <Col span={8}>Délai de payement </Col>
                  <Col span={14}>{data.Fact_delaiDePayement}</Col>
                </Row>
                <Row gutter={32}>
                  <Col span={8}>Mode d'envoi des factures </Col>
                  <Col span={14}>{data.Fact_ModeDenvoi}</Col>
                </Row>
                <Row gutter={32}>
                  <Col span={8}>Condition Tarifiaires </Col>
                  <Col span={14}>{data.Fact_conditions}</Col>
                </Row>
                <Row gutter={32}>
                  <Col span={8}>procédures de factoration </Col>
                  <Col span={14}>{data.Fact_procedure}</Col>
                </Row>
              </Card>
              <Col span={24} />
              <Button
                size="large"
                style={{
                  left: "15vw",
                  marginTop: "50px",
                  borderRadius: "10px",
                  background: "lightgray",
                }}
                onClick={() => window.print()}
              >
                <b>export PDF</b>
              </Button>
            </Col>
          </Row>
        )}
        <div style={{ textAlign: "center", marginTop: "1vw" }}>
          {current < steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => {
                setdata({ ...form.getFieldsValue() });
                next();
              }}
            >
              Suivant
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" htmlType="submit" loading={buttonload}>
              Terminé
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
              {current === 2 ? "Editer" : "Précedent"}
            </Button>
          )}
        </div>
      </Card>
    </Form>
  );
};

export default CardContrat;
