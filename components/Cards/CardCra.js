import React, { useEffect, useState } from "react";

import {
  Button,
  Card,
  Col,
  Divider,
  notification,
  Progress,
  Row,
  Select,
  Space,
  Statistic,
  Tag,
  Typography,
} from "antd";
import CardModal from "./CardModal";
import axios from "axios";
import { useSelector } from "react-redux";
import Title from "antd/lib/typography/Title";
import {
  ArrowDownwardOutlined,
  ArrowUpwardOutlined,
  CalendarTodayOutlined,
  CalendarTodayTwoTone,
  CheckOutlined,
  PictureAsPdfOutlined,
} from "@material-ui/icons";
import  { Pie }  from "@ant-design/plots";
import _ from "lodash";
import jsPDF from "jspdf";

const { Option } = Select;
export default function CardCra() {
  const auth = useSelector((state) => state.auth);
  const [contract, setContract] = useState({});
  const [listuser, setlistuser] = useState([]);
  const [loading, setloqding] = useState(true);
  const [isAdmin, setisAdmin] = useState(false);
  const [id, setid] = useState(auth.user.id);
  const [data, setData] = useState([]);
  const email =
    typeof window !== "undefined" ? window.localStorage.getItem("email") : "";
  const d = new Date();
  const [visible, setvisible] = useState(false);

  useEffect(() => {
    console.log("authauth", auth);
    if (id && typeof window !== "undefined") {
      console.log("idddd", id);
      setloqding(true);

      if (window.localStorage.getItem("isAdmin") === "true") {
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
      axios
        .post(`/api/users/get/cra`, {
          email: listuser.find((e) => e._id === id)?.email ?? email,
          mounth: d.getMonth() + 1,
        })
        .then((res) => {
          console.log("testttttttttttttttt", res.data.DataList);
          let obj = _.countBy(res.data.DataList, (rec) => {
            switch (rec.content) {
              case "Maladie":
                return "Maladie";
              case "Téle Travail":
                return "TeleTrav";
              case "Congé":
                return "Cong";
              default:
                return "Travaille";
            }
          });
          console.log("testt",obj)
          setData([
            {
              type: "Travaille",
              value: Number(obj.Travaille)??0,
            },
            {
              type: "Maladie",
              value: Number(obj.Maladie)??0,
            },
            {
              type: "Congé",
              value: Number(obj.Cong)??0,
            },
            {
              type: "Téle Travail",
              value: Number(obj.TeleTrav)??0,
            },
          ]);
        });
      axios
        .get(`/api/users/contrat/${id}`)
        .then((res) => {
          setContract(res?.data?.con);
          setloqding(false);
        })
        .catch((err) => {
          notification.error({
            message: "something is wrong",
            description: err,
          });
        });
    }
  }, [id, visible]);

  const onCancel = () => {
    setvisible(false);
  };
  const generatePDF = () => {
    const report = new jsPDF("portrait", "pt", "a4");
    //TODO GENERATE PDF
    report.save("report.pdf");
  };

  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    label: {
      type: "outer",
      content: "{name} {percentage}",
    },
    interactions: [
      {
        type: "pie-legend-active",
      },
      {
        type: "element-active",
      },
    ],
  };
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

  const handleValidate = async () => {
    await axios
      .put(`/api/users/contrat/${contract._id}`, {
        ...contract,
        Status: "Validate",
        user: id,
      })
      .then(() => {
        setContract({
          ...contract,
          Status: "Validate",
          user: id,
        });
        notification.success({ message: "CRA Validated" });
      });
  };
  return (
    <>
      <Card
        title={
          <div>
            <p
              style={{
                color: "#ffffff",
                fontWeight: "bolder",
                fontSize: "30px",
              }}
            >
              Mon Salaire <Tag color="blue">{contract.Status}</Tag>
            </p>
            {isAdmin === true && <b>{userSelect}</b>}
            <br />
            {isAdmin && (
              <Button icon={<CheckOutlined />} onClick={() => handleValidate()}>
                Validate CRA
              </Button>
            )}
          </div>
        }
        style={{ textAlign: "center", backgroundColor: "#669bbc" }}
        loading={loading}
      >
        <Row gutter={32} style={{ marginBottom: "30px" }}>
          <Col span={7}>
            {/*  */}
            <Card title="Mon congé payé" hoverable>
              <Row>
                <Col span={12}>
                  Total N1:
                  <br />
                  <Progress
                    type="dashboard"
                    percent={contract.TotaleN}
                    format={(percent) => `${percent} jours`}
                    showInfo
                  />
                </Col>
                <Col span={12}>
                  Conges restants:
                  <br />
                  <Progress
                    type="dashboard"
                    percent={100 - contract.netavant}
                    format={(percent) => `${percent} jours`}
                    gapDegree={30}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={13}>
            <Row>
              <Col span={24}>
                <Card hoverable>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Statistic
                        title="Solde avant disrubution:"
                        value={contract.salaryBf}
                        precision={2}
                        valueStyle={{ color: "#3f8600" }}
                        prefix={<ArrowUpwardOutlined />}
                        suffix="$"
                      />
                    </Col>
                    <Col span={12}>
                      <Statistic
                        title="Solde aprés disrubution"
                        value={contract.salaryAf}
                        precision={2}
                        valueStyle={{ color: "#cf1322" }}
                        prefix={<ArrowDownwardOutlined />}
                        suffix="$"
                      />
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
            <br />
            <Row>
              <Col span={24}>
                <Card hoverable bordered>
                  <Row>
                    Contrat de travail: <b>{contract.type}</b>
                  </Row>
                  <Row>
                    <Typography>
                      CA du mois: <b>{contract.rest_Total} $</b>
                    </Typography>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col span={4}>
            <Button
              size="large"
              style={{
                marginTop: "100px",
                borderRadius: "10px",
                background: "lightgray",
              }}
              icon={<PictureAsPdfOutlined />}
              onClick={() => typeof window !== "undefined" ?window.print():null}
            >
              <b>export PDF</b>
            </Button>
          </Col>
        </Row>
        <Row gutter={32} style={{ marginBottom: "30px" }}>
          <Col span={14}>
            <Card
              title="CRA"
              hoverable
              extra={
                <Button
                  onClick={() => setvisible(true)}
                  icon={<CalendarTodayTwoTone />}
                >
                  Compte rendue d'activité{" "}
                </Button>
              }
            >
              <Pie {...config} />
            </Card>
          </Col>
          <Col span={10}>
            <Card title="Saisie" hoverable>
              <Row gutter={16}>
                <Col>
                  Prime complemtaire: <br />{" "}
                  <Progress
                    type="circle"
                    percent={contract.Prime / 1000}
                    format={(percent) => `${percent} k $`}
                  />
                </Col>
                <Col>
                  Reserve finonciere: <br />{" "}
                  <Progress
                    type="circle"
                    percent={contract.Res / 1000}
                    status="exception"
                    format={(percent) => `${percent} k $`}
                  />
                </Col>
                <Col>
                  Chomage: <br />
                  <Progress
                    type="circle"
                    percent={contract.chomage / 1000}
                    format={(percent) => `${percent} k $`}
                  />{" "}
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Card hoverable>
              <Row gutter={32}>
                <Col span={12}>
                  <Title level={4}>Frais et charges </Title>
                  <Divider />
                  <Row>
                    frais de gestion <b>{contract.Prime}$</b>
                    <Progress percent={50} status="active" />
                  </Row>
                  <Row>
                    provision <b>{contract.Prime}$</b>
                    <Progress percent={70} status="normal" />
                  </Row>
                  <Row>
                    Charges sociales <b>{contract.Prime}$</b>
                    <Progress percent={100} />
                  </Row>
                </Col>

                <Col span={12}>
                  <Title level={4}>Salaire </Title>
                  <Divider />
                  <Row>
                    Salaire Bruit <b>{contract.Prime} $</b>
                    <Progress percent={30} status="active" />
                  </Row>
                  <Row>
                    Net avant impot <b>{contract.Prime}$</b>
                    <Progress percent={50} />
                  </Row>
                  <Row>
                    Reste a verser sur le mois <b>{contract.Prime}$</b>
                    <Progress percent={70} status="exception" />
                  </Row>
                </Col>
              </Row>
              <Row>
                {" "}
                <Col span={24}>
                  <p
                    style={{
                      textAlign: "center",
                      fontSize: "30px",
                      color: "lightblue",
                      marginTop: "1.5rem",
                    }}
                  >
                    {" "}
                    Reste a verser sur le mois : <b>
                      {contract.rest_Total}$
                    </b>{" "}
                  </p>{" "}
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Card>
      <CardModal
        id={id}
        name={listuser.find((e) => e._id === id)?.name ?? auth.user.name}
        email={listuser.find((e) => e._id === id)?.email ?? email}
        visible={visible}
        onCancel={onCancel}
      />
    </>
  );
}
