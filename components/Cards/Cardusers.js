import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Input,
  notification,
  Row,
  Space,
  Spin,
  Table,
} from "antd";
import axios from "axios";
import { DeleteOutlined, SaveOutlined } from "@material-ui/icons";

export default function Cardusers() {
  const [loading, setloqding] = useState(false);
  const [listuser, setlistuser] = useState([]);

  useEffect(() => {
    setloqding(true);
    async function callapi() {
      await axios
        .get(`/api/users/Users/List`)
        .then((res) => {
          setlistuser(res?.data?.user ?? []);
          setloqding(false);
        })
        .catch((err) => {
          setloqding(false);

          notification.error({
            message: "something is wrong",
            description: err,
          });
        });
    }
    callapi();
  }, []);
  const handlesave = (record) => {
    axios
      .put(`/api/users/Users/${record._id}`, {
        name: record.name,
        email: record.email,
      })
      .then((res) => {
        setloqding(true);
        async function callapi() {
          await axios
            .get(`/api/users/Users/List`)
            .then((res) => {
              setlistuser(res?.data?.user ?? []);
              setloqding(false);
            })
            .catch((err) => {
              setloqding(false);

              notification.error({
                message: "something is wrong",
                description: err,
              });
            });
        }
        callapi();
        notification.success({ message: "updated" });
      })
      .catch((err) => {
        notification.error({ message: "something wrong" });
      });
  };

  const handledelete = (record) => {
    axios.delete(`/api/users/Users/${record._id}`).then((res) => {
      notification.success({ message: "deleted" });
      setloqding(true);
      async function callapi() {
        await axios
          .get(`/api/users/Users/List`)
          .then((res) => {
            setlistuser(res?.data?.user ?? []);
            setloqding(false);
          })
          .catch((err) => {
            setloqding(false);

            notification.error({
              message: "something is wrong",
              description: err,
            });
          });
      }
      callapi();
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
      title: "name",
      dataIndex: "name",
      key: "name",
      render: (text, record, index) => (
        <Input
          defaultValue={text}
          onChange={(val) => {
            const list = listuser;
            list[index].name = val.target.value;
            setlistuser(list);
          }}
        />
      ),
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
      render: (text, record, index) => (
        <Input
          defaultValue={text}
          onChange={(val) => {
            const list = listuser;
            list[index].email = val.target.value;
            setlistuser(list);
          }}
        />
      ),
    },

    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => handlesave(record)} style={{ border: "none" }}>
            <SaveOutlined />
          </Button>
          <Button
            onClick={() => handledelete(record)}
            style={{ border: "none" }}
          >
            <DeleteOutlined style={{color:"red"}}/>
          </Button>
        </Space>
      ),
    },
  ];

  const content = (
    <Spin spinning={loading}>
      <Row>
        <Col span={24}>
          <Table
            pagination={{ pageSize: 7 }}
            size="small"
            columns={columns}
            dataSource={listuser}
          />
        </Col>
      </Row>
    </Spin>
  );

  return (
    <Card
      title={
        <p
          style={{
            color: "#ffffff",
            fontWeight: "bolder",
            fontSize: "30px",
          }}
        >
          Users
        </p>
      }
      style={{ textAlign: "center", backgroundColor: "#8473f5" }}
    >
      <Card>{content}</Card>
    </Card>
  );
}
