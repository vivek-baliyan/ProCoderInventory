﻿using Microsoft.Extensions.DependencyInjection;
using PCI.Application.Services.Implementations;
using PCI.Application.Services.Interfaces;

namespace PCI.Application;

public static class ServiceExtensions
{
    public static void ConfigureApplication(this IServiceCollection services)
    {
        services.AddScoped<ISessionManagementService, SessionManagementService>();
        services.AddScoped<IIdentityService, IdentityService>();
    }
}
