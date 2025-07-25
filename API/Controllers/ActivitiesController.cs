using System;
using Application.Activities.Commands;
using Application.Activities.DTOs;
using Application.Activities.Queries;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers;

public class ActivitiesController : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities(){
        return await Mediator.Send(new GetActivitiesList.Query());
        
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetActivitiesDetails(string id)
    {
        return handleResult(await Mediator.Send(new GetActivitiesDetails.Query{Id = id}));

        
    }

    [HttpPost]
    public async Task<ActionResult<string>> CreateActivity(CreateActivityDto activityDto){
        return handleResult(await Mediator.Send(new CreateActivity.Command{ActivityDto = activityDto}));
    } 

    [HttpPut]
    public async Task<IActionResult> Edit(EditActivityDto activity)
    {
         return handleResult(await Mediator.Send(new EditActivity.Command(){ActivityDto = activity}));

         
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteActivity(string id){
       return handleResult(await Mediator.Send(new DeleteActivity.Command(){Id = id}));
        
    }
}
