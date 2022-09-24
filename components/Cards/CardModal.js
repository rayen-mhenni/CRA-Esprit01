import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Calendar,
  Card,
  Col,
  Modal,
  notification,
  Popconfirm,
  Row,
  Select,
  Spin,
} from "antd";
import moment from "moment";
import axios from "axios";
import { useSelector } from "react-redux";

const CardModal = (props) => {
  const d = new Date();

  const [data, setdata] = useState([]);
  const [selected, setselected] = useState();
  const [loading, setloading] = useState(true);

  let newdata = [];

  const [contract, setContract] = useState({});

  useEffect(() => {
    console.log("props", props.id, props.email, props.name);
    setloading(true);
    axios
      .post(`/api/users/get/cra`, {
        email: props.email,
        mounth: d.getMonth() + 1,
      })
      .then((res) => {
        console.log("testttttttttttttttt", res.data.DataList);
        res.data.DataList.forEach((e) => (newdata[e.day] = e));
        setdata(newdata);
        setloading(false);
      })
      .catch(() => setloading(false));
    axios
      .get(`/api/users/contrat/${props.id}`)
      .then((res) => {
        setContract(res.data?.con);
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
  }, [props.visible]);

  function getListData(value) {
    console.log(
      "listdataaaa",
      data,
      "this is day",
      value.date(),
      "cell content",
      data[value.date()],
      "data[value.date()]",
      data[value.date()]
    );
    return value.date() === data[value.date()]?.day ? data[value.date()] : [];
  }

  function handleSelectCell(date) {
    setselected(date);
  }
  function handleSet(date, value) {
    const field = data.find(
      (e) => e?.mounth === date.month() + 1 && e.day === date.date()
    );
    var newdata = data;
    var obj = {};
    switch (value) {
      case "TRV":
        obj = {
          type: "success",
          content: "Travaille",
          day: date.date(),
        };
        break;
      case "MAL":
        obj = {
          type: "error",
          content: "Maladie",
          day: date.date(),
        };
        break;
      case "CONG":
        obj = {
          type: "warning",
          content: "Congé",
          day: date.date(),
        };
        break;
      case "TELE":
        obj = {
          type: "processing",
          content: "Téle Travail",
          day: date.date(),
        };
        break;
      default:
    }

    newdata[date.date()] = obj;
    if (field === undefined)
      axios
        .post("/api/users/cra", {
          email: props.email,
          type: obj.type,
          content: obj.content,
          mounth: d.getMonth() + 1,
          day: obj.day,
        })
        .then((res) => {
          console.log("success");
        })
        .catch((err) => {
          console.log(err);
        });
    else
      axios
        .put(`/api/users/cra/${field._id}`, {
          email: props.email,
          type: obj.type,
          content: obj.content,
          mounth: d.getMonth() + 1,
          day: obj.day,
        })
        .then((res) => {
          console.log("success");
        })
        .catch((err) => {
          console.log(err);
        });
  }

  async function deletef(day) {
    await axios.post(`/api/users/delete/cra`, {
      email: props.email,
      day: day,
      mounth: d.getMonth() + 1,
    });
    notification.success({ message: `day ${day} deleted ` });
    await axios
      .post(`/api/users/get/cra`, {
        email: props.email,
        mounth: d.getMonth() + 1,
      })
      .then((res) => {
        res.data.DataList.forEach((e) => (newdata[e.day] = e));
        setdata(newdata);
      });
  }
  function dateCellRender(value) {
    if (loading === false) {
      var dataToset = [getListData(value)];

      if (moment(value).get("month") === d.getMonth())
        if (
          moment(value).format("YYYY-MM-DD") ===
          moment(selected).format("YYYY-MM-DD")
        )
          return (
            <>
              <Row>Select: </Row>
              <Row span={16}>
                <Select
                  onChange={(val) => handleSet(value, val)}
                  style={{ width: "120px" }}
                >
                  <Select.Option value="TRV">Travail</Select.Option>
                  <Select.Option value="CONG">congé</Select.Option>
                  <Select.Option value="TELE">Téle Travail</Select.Option>
                  <Select.Option value="MAL">Maladie</Select.Option>
                </Select>
                <Popconfirm
                  title="Are you sure？"
                  onConfirm={() => deletef(value.date())}
                >
                  <Button size="small">Delete</Button>
                </Popconfirm>
              </Row>
            </>
          );
        else if (
          moment(value).format("dddd") === "Saturday" ||
          moment(value).format("dddd") === "Sunday"
        ) {
          return (
            <div
              style={{
                background: "gray",
                position: "absolute",
                top: "0px",
                right: "0px",
                bottom: "0px",
                left: "0px",
                opacity: "30%",
              }}
            >
              <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                {dataToset.map((item) => (
                  <li key={0}>
                    <Badge status={item.type} text={item.content} />
                  </li>
                ))}
              </ul>
            </div>
          );
        } else if (dataToset[0].length === 0) {
          // handleSet(value, "TRV");
          return (
            <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
              <li key={0}>
                <Badge status="success" text="Travaille" />
              </li>
            </ul>
          );
        } else
          return (
            <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
              {dataToset.map((item) => (
                <li key={0}>
                  <Badge status={item.type} text={item.content} />
                </li>
              ))}
            </ul>
          );
    }
  }

  return (
    <Modal
      title={
        <>
          Votre compte rendue d'activité de{" "}
          <p
            style={{
              fontWeight: "bold",
              color: "lightblue",
              fontSize: "40px",
              textAlign: "center",
            }}
          >
            {d.toLocaleString("fr", { month: "long" })}
          </p>
        </>
      }
      visible={props.visible}
      onCancel={props.onCancel}
      footer={null}
      width="1200px"
    >
      <Row gutter={32}>
        <Col span={9}>
          <Row>
            Login : &nbsp; <b>{props.name}</b>
          </Row>
          <Row>
            Contrat e travail: &nbsp; <b>{contract.type}</b>
          </Row>
        </Col>
        <Col span={9}>
          <Row>
            Solde de compte: &nbsp; <b>{contract.salaryBf} $</b>
          </Row>
          <Row>
            Chiffre de facture :&nbsp; <b>{contract.rest_mois}</b>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Card
            title={
              <Row gutter={32}>
                <Col>
                  <Badge status="warning" text="Congé" />
                  &nbsp; {data.filter((e) => e.content === "Congé").length}
                </Col>
                <Col>
                  <Badge status="error" text="Maladie" />
                  &nbsp; {data.filter((e) => e.content === "Maladie").length}
                </Col>
                <Col>
                  <Badge status="success" text="Travail" />
                  &nbsp; {data.filter((e) => e.content === "Travaille").length}
                </Col>
                <Col>
                  <Badge status="processing" text="Téle Travail" />
                  &nbsp;{" "}
                  {data.filter((e) => e.content === "Téle Travail").length}
                </Col>
              </Row>
            }
          >
            <Spin spinning={loading}>
              <Calendar
                dateCellRender={dateCellRender}
                onSelect={(val) => handleSelectCell(val)}
                mode="month"
                value={moment()}
                headerRender={() => null}
              ></Calendar>
            </Spin>
          </Card>
        </Col>
      </Row>
    </Modal>
  );
};

export default CardModal;
