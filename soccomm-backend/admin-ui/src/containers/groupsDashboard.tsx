import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const allPrivate = gql`
  query {
    allprivate {
      id
      type
    }
  }
`;
const allPublic = gql`
  query {
    allpublic {
      id
    }
  }
`;

export default function GroupsDashboard()
{
  const history = useHistory();
  console.log("Hii");
  const d = useQuery(allPrivate, { fetchPolicy: "network-only" });
  const publicData1 = useQuery(allPublic, { fetchPolicy: "network-only" });
  const [privateData, setPrivateData] = useState(null);
  const [publicData, setPublicData] = useState(null);
  useEffect(() => {
    if (d.data != undefined && publicData1.data != undefined) {
      setPrivateData(d.data.allprivate.length);
      setPublicData(publicData1.data.allpublic.length);
    }
  }, [d.data, publicData1.data]);

  const handleClick = (event) => {
    event.preventDefault();
    console.info("clicked.");
  };
  return (
    <Box sx={{ flexGrow: 1 }} style={{ padding: "50px" }}>

      <Grid container spacing={1}>
        <Grid item lg={6}>
          <Card
            onClick={() =>
              history.push( {
                pathname: "/manage-groups",
                search: `?type=private`,
                state: { type: "private" },
              } )
            }
            sx={{ minWidth: 280, minHeight: 255 }}
            style={{
              backgroundColor: "rgba(255, 100, 132, 0.2)",
              padding: "60px",
              margin: "150px",
            }}
          >
            <CardContent>
              <Typography
                sx={{ fontSize: 22 }}
                color="text.secondary"
                gutterBottom
              >
                PrivateGroups
              </Typography>
              <br />
              <Typography
                sx={{ fontSize: 20 }}
                color="text.secondary"
                gutterBottom
              >
                Count:{privateData}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={6}>
          <Card
            onClick={() =>
              history.push( {
                pathname: "/manage-groups",
                search: `?type=public`,
                state: { type: "public" },
              } )
            }
            sx={{ minWidth: 280, minHeight: 255 }}
            style={{
              backgroundColor: "#e6ccff",
              padding: "50px",
              margin: "150px",
            }}
          >
            <CardContent>
              <Typography
                sx={{ fontSize: 22 }}
                color="text.secondary"
                gutterBottom
              >
                PublicGroups
              </Typography>
              <br />

              <Typography
                sx={{ fontSize: 20 }}
                color="text.secondary"
                gutterBottom
              >
                Count:{publicData}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
