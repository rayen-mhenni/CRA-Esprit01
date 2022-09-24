import React, { useEffect, useState } from "react";

import {
  Button,
  Card,
  Col,
  Divider,
  notification,
  Row,
  Select,
  Space,
  Spin,
  Table,
  Tabs,
  Tag,
  Typography,
} from "antd";
import CardModal from "./CardModal";
import axios from "axios";
import { useSelector } from "react-redux";
import Title from "antd/lib/typography/Title";
import {
  AddOutlined,
  CheckOutlined,
  EditOutlined,
  RemoveRedEyeOutlined,
} from "@material-ui/icons";
import moment from "moment";
import FraisModal from "./FraisModal";
const { Option } = Select;

const { TabPane } = Tabs;
export default function CardFrais() {
  const auth = useSelector((state) => state.auth);
  const [type, settype] = useState("ALL");
  const [loading, setloqding] = useState(false);
  const [data, setdata] = useState([]);
  const [isAdmin, setisAdmin] = useState(false);
  const [id, setid] = useState(auth.user.id);
  const [listuser, setlistuser] = useState([]);

  useEffect(() => {
    console.log("authauth", auth);
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
        .get(`/api/users/frais/${id}/${type}`)
        .then((res) => {
          console.log("response", res);
          setdata(res.data?.con);
          setloqding(false);
        })
        .catch((err) => {
          notification.error({
            message: "something is wrong",
            description: err,
          });
          setloqding(false);
        });
    }
    callapi();
  }, [type, id]);
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
  function handleSave(data) {
    console.log("dataaa", data);
  }
  const [visible, setvisible] = useState(false);
  const [display, setdisplay] = useState(false);
  const [create, setcreate] = useState(false);
  const [record, setrecord] = useState({});
  const onCancel = () => {
    setvisible(false);
    setrecord([]);
    setcreate(false);
    setdisplay(false);
  };
  const handlechangestatus = (record) => {
    axios
      .put(`/api/users/frais/${record._id}`, {
        type: record.type,
        date: record.date,
        ClientFrais: record.ClientFrais,
        justification: record.justification,
        motif: record.motif,
        HT: record.HT,
        TTC: record.TTC,
        TVA: record.TVA,
        MontantRemb: record.MontantRemb,
        TVADed: record.TVADed,
        Immobilisation: record.Immobilisation,
        Status: "Validate",
      })
      .then((res) => {
        setloqding(true);
        async function callapi() {
          await axios
            .get(`/api/users/frais/${id}/${type}`)
            .then((res) => {
              console.log("response", res);
              setdata(res.data?.con);
              setloqding(false);
              notification.success({ message: "updated" });
            })
            .catch((err) => {
              notification.error({
                message: "something is wrong",
                description: err,
              });
              setloqding(false);
            });
        }
        callapi();
        notification.success({ message: "updated" });
      })
      .catch((err) => {
        notification.error({ message: "something wrong" });
      });
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "id",
      render: (text) =>
        String(text).substring(String(text).length - 5, String(text).length),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => moment(text).format("YYYY/MM/DD"),
      sorter: {
        compare: (a, b) => moment(a.date) > moment(b.date),
      },
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "HT (€)",
      dataIndex: "HT",
      key: "ht",
      render: (text) => text + " €",
    },
    {
      title: "TTC (€)",
      dataIndex: "TTC",
      key: "ttc",
      render: (text) => text + " €",
    },
    {
      title: "TVA (€)",
      dataIndex: "TVA",
      key: "tva",
      render: (text) => text + " €",
    },
    {
      title: "Montant rembourser",
      dataIndex: "MontantRemb",
      key: "montantrm",
      render: (text) => text + " €",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "Status",
      render: (status) =>
        status === "Validate" ? (
          <Tag color="blue" key={0}>
            {status}
          </Tag>
        ) : (
          <Tag color="volcano" key={0}>
            {status}
          </Tag>
        ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            onClick={() => {
              setdisplay(true);
              setrecord(record);
              setcreate(false);
              setvisible(true);
            }}
            style={{ border: "none" }}
          >
            <RemoveRedEyeOutlined />
          </Button>
          <Button
            onClick={() => {
              setdisplay(false);
              setrecord(record);
              setcreate(false);
              setvisible(true);
            }}
            style={{ border: "none" }}
          >
            {" "}
            <EditOutlined />
          </Button>
          {isAdmin === true && (
            <Button
              onClick={() => {
                handlechangestatus(record);
              }}
              style={{ border: "none" }}
            >
              <CheckOutlined />
            </Button>
          )}
        </Space>
      ),
    },
  ];
  const handlechange = (e) => {
    let type = "";

    switch (Number(e)) {
      case 1:
        type = "ALL";
        break;
      case 2:
        type = "NF";
        break;
      case 3:
        type = "FR";
        break;
      case 4:
        type = "TR";
        break;
      case 5:
        type = "FK";
        break;
      case 6:
        type = "GD";
        break;
      case 7:
        type = "FT";
        break;
      default:
        type = "ALL";
    }
    settype(type);
    console.log("typee", type);
  };
  const content = (
    <Spin spinning={loading}>
      <Row>
        <Col span={22}></Col>
        <Col span={2}>
          <Button
            onClick={() => {
              setdisplay(false);
              setcreate(true);
              setvisible(true);
            }}
            icon={
              <AddOutlined
                style={{
                  position: "relative",
                  fontSize: "1rem",
                  marginBottom: "3px",
                  marginRight: "3px",
                }}
              />
            }
            style={{
              width: "80px",
              marginBottom: "1rem",
              borderRadius: "10px",
              border: "solid 1px",
            }}
          >
            Add
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table
            pagination={{ pageSize: 5 }}
            size="middle"
            columns={columns}
            dataSource={data}
          />
        </Col>
      </Row>
    </Spin>
  );

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
              Mes Frais
            </p>
            {isAdmin === true && userSelect}
          </div>
        }
        style={{ textAlign: "center", backgroundColor: "#8473f5" }}
      >
        <Card>
          <Tabs
            type="card"
            tabBarStyle={{ color: "black" }}
            defaultActiveKey="1"
            onChange={handlechange}
          >
            <TabPane tab="Tous" key="1">
              {content}
            </TabPane>
            <TabPane tab="Notes de frais" key="2">
              {content}
            </TabPane>

            <TabPane tab="Forfait Repas" key="3">
              {content}
            </TabPane>
            <TabPane tab="Ticket Restaurant" key="4">
              {content}
            </TabPane>
            <TabPane tab="Frais kilométriques" key="5">
              {content}
            </TabPane>
            <TabPane tab="Grands déplacements" key="6">
              {content}
            </TabPane>
            <TabPane tab="Frais de Télétravail" key="7">
              {content}
            </TabPane>
          </Tabs>
        </Card>
      </Card>

      <FraisModal
        visible={visible}
        onCancel={onCancel}
        display={display}
        create={create}
        record={record}
        onsave={handleSave}
      />
    </>
  );
}
