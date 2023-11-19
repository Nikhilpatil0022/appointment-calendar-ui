import React from "react";
import Styled from "styled-components";
import { getDisplayNameOfUser } from "../utilitites/utilities";
import {
  Button,
  Heading,
  Popover,
  PopoverArrow,
  Portal,
  PopoverContent,
  PopoverTrigger,
  PopoverBody,
} from "@chakra-ui/react";
import withNavigate from "../hooks/withNavigate";
import { ApiService } from "../services/app.api.service";
import { ListItem } from "./List";
import { withAppConsumer } from "../context/app.context";

const Wrapper = Styled.div`
    display: grid;
    grid-template-rows: max-content 1fr;
    grid-gap: 16px;
    .user-name{
      justify-self: end;
      max-width: 300px;
      cursor: pointer;
    }
    .layout-header {
        display: grid;
        grid-template-columns: 1fr max-content max-content;
        grid-gap: 16px;
        padding: 16px;
        align-items: center;
        background: #b8e3e3;
        .header-text{
            font-size: 24px; 
            font-weight: 600;
        }
    }

    .layout-content{
      height: calc(100vh - 86px);
      width: 80vw;
      border-radius: 4px;
      justify-self: center;

      display: grid; 
      grid-template-columns: 300px 1fr;
      grid-gap: 16px; 
    }

    .navigation-bar{
      background: #cceded;
      padding: 16px;
      height: inherit;
      width: 300px;
      border-radius: 4px;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        display: none;
      }
      font-size: 20px;
      font-weight: 500;

      .nav-item{
        cursor: pointer;
        padding: 8px;
      }
      .selected{
        background: #e9f2f2;
        border-radius: 4px;
      }
    }

    .content-children{
      height: inherit;
      background: white;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        display: none;
      }
    }

    .navigation-bar, .layout-children{
        -ms-overflow-style: none; 
        scrollbar-width: none;
    }

    .list-item{
      cursor: pointer;
      &: hover{
        background: #d5f5f5;
      }
    }
    .list-item: last-child{
      border-bottom: none;
    }
`;

const NAVIGATION_CONFIG = [
  {
    text: "Dashboard",
    route: "dashboard",
  },
  {
    text: "Calendar",
    route: "calendar",
  },
];

const Layout = (props) => {
  const {
    navigate,
    location,
    children,
    appContext: {
      state: {
        userState: { userData },
      },
    },
  } = props;

  const handleLogOut = React.useCallback(() => {
    ApiService.handleSuccessfullLogOut();
    // console.log(ApiService.handleSuccessfullLogOut);
  }, []);

  const popOverOptionsConfig = React.useMemo(() => {
    return [{ text: "Log Out", onClick: handleLogOut }];
  }, []);

  const navigateToCreateAppointment = () => {
    if (!location.pathname.includes("appointment-form")) {
      navigate("/appointment-form");
    }
  };

  const handleOnNavigationClick = (route) => {
    if (!location.pathname.includes(route)) {
      navigate(`/${route}`);
    }
  };
  return (
    <Wrapper>
      <div className="layout-header">
        <div className="header-text">ZENDENTA</div>
        <Button
          colorScheme="teal"
          variant="outline"
          onClick={navigateToCreateAppointment}
        >
          Add Appointment
        </Button>
        <Popover>
          <PopoverTrigger>
            <Heading className="user-name ellipsis" size="md">
              {`Hi, ${getDisplayNameOfUser(userData)}`}
            </Heading>
          </PopoverTrigger>

          <PopoverContent>
            <PopoverArrow />
            <PopoverBody className="list-container">
              {popOverOptionsConfig.map((opt) => (
                <ListItem className="list-item" onClick={opt.onClick}>
                  {opt.text}
                </ListItem>
              ))}
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </div>
      <div className="layout-content">
        <div className="navigation-bar">
          {NAVIGATION_CONFIG.map((nav) => (
            <div
              onClick={() => handleOnNavigationClick(nav.route)}
              className={`nav-item ${
                location.pathname.includes(nav.route) ? "selected" : ""
              }`}
            >
              {nav.text}
            </div>
          ))}
        </div>
        <div className="content-children ">
          <div>{children}</div>
        </div>
      </div>
    </Wrapper>
  );
};

export default withNavigate(withAppConsumer(Layout));
