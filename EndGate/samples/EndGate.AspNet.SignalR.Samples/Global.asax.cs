﻿using System;
using System.Web.Routing;

namespace EndGate.AspNet.SignalR.Samples
{
    public class Global : System.Web.HttpApplication
    {

        protected void Application_Start(object sender, EventArgs e)
        {
            RouteTable.Routes.MapHubs();
        }

    }
}