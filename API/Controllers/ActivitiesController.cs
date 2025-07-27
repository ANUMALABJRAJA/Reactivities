using System;
using API.DTOs;
using Application.Activities.Commands;
using Application.Activities.DTOs;
using Application.Activities.Queries;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers;

public class ActivitiesController : BaseApiController
{

    [HttpGet]
    public async Task<ActionResult<List<ActivityDto>>> GetActivities(){
        return await Mediator.Send(new GetActivitiesList.Query());
        
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ActivityDto>> GetActivitiesDetails(string id)
    {
        return handleResult(await Mediator.Send(new GetActivitiesDetails.Query{Id = id}));

        
    }

    [HttpPost]
    public async Task<ActionResult<string>> CreateActivity(CreateActivityDto activityDto){
        return handleResult(await Mediator.Send(new CreateActivity.Command{ActivityDto = activityDto}));
    } 

    [HttpPut("{id}")]
    [Authorize(Policy = "IsActivityHost")]
    public async Task<IActionResult> Edit(string id, EditActivityDto activity)
    {
        activity.Id = id;
         return handleResult(await Mediator.Send(new EditActivity.Command(){ActivityDto = activity}));

         
    }

    [HttpDelete("{id}")]
    [Authorize(Policy = "IsActivityHost")]
    public async Task<IActionResult> DeleteActivity(string id){
       return handleResult(await Mediator.Send(new DeleteActivity.Command(){Id = id}));
        
    }

    [HttpPost("{id}/attend")]
    public async Task<IActionResult> Attend(string id)
    {
        return handleResult(await Mediator.Send(new UpdateAttendance.Command(){Id = id}));
    }

}
