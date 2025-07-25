using System;
using System.Text.Json;
using Application.Core;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace API.Middleware;

public class ExceptionMiddleware(ILogger<ExceptionMiddleware> logger, IHostEnvironment env) : IMiddleware
{
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
       try
       {
         await next(context);
       }
       catch(ValidationException ex)
       {
        await HandleValidationException(context,ex);
       }
       catch (Exception e)
       {
        await HandleException(context, e);
       }
    }

    private async Task HandleException(HttpContext context ,Exception e)
    {
        logger.LogError(e, e.Message);
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = StatusCodes.Status500InternalServerError;
        var response = env.IsDevelopment() ? 
                    new AppException(context.Response.StatusCode, e.Message,e.StackTrace) : 
                    new AppException(context.Response.StatusCode, e.Message, null);
        var options = new JsonSerializerOptions{PropertyNamingPolicy = JsonNamingPolicy.CamelCase};

        var json = JsonSerializer.Serialize(response, options);
        await context.Response.WriteAsync(json);
    }

    private static async Task HandleValidationException(HttpContext context, ValidationException ex)
    {
        var validationErrors = new Dictionary<string, string[]>();

        if(ex.Errors is not null)
        {
            foreach (var error in ex.Errors)
            {
                if(validationErrors.TryGetValue(error.PropertyName, out var existingErrors))
                {
                    validationErrors[error.PropertyName] = [.. existingErrors, error.ErrorMessage];
                }
                else
                {
                    validationErrors[error.PropertyName] = [error.ErrorMessage];
                }
            }
        }
        context.Response.StatusCode = StatusCodes.Status400BadRequest;

        var validationProblemDetails = new ValidationProblemDetails(validationErrors){
            Status = StatusCodes.Status400BadRequest,
            Title = "Validation Error",
            Type = "Validation Failure",
            Detail = "One or More validation Error has occured"
        };

        await context.Response.WriteAsJsonAsync(validationProblemDetails);
    }
}
