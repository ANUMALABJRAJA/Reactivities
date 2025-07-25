using System;
using Application.Activities.DTOs;
using FluentValidation;

namespace Application.Activities.Validators;

public class BaseActivityValidator<T,TDto> : AbstractValidator<T> where TDto 
    : BaseActivityDto
{   
   public BaseActivityValidator(Func<T, TDto> selector){
        RuleFor(x => selector(x).Title)
            .NotEmpty().WithMessage("Titile is Required")
            .MaximumLength(100).WithMessage("Title exceeded 100 chars");
        RuleFor(x => selector(x).Description).NotEmpty().WithMessage("Description is Required");
        RuleFor(x => selector(x).Date).GreaterThan(DateTime.UtcNow).WithMessage("Date must be in feature");
        RuleFor(x => selector(x).Category).NotEmpty().WithMessage("Category is required");
        RuleFor(x=>selector(x).City).NotEmpty().WithMessage("City is required");
        RuleFor(x=>selector(x).Venue).NotEmpty().WithMessage("Venue is required");
        RuleFor(x=>selector(x).Latitude).NotEmpty().WithMessage("Latitude is Required").InclusiveBetween(-90,90).WithMessage("Latitude must be between -90 and 90");
        RuleFor(x=>selector(x).Longitude).NotEmpty().WithMessage("Latitude is Required").InclusiveBetween(-180,180).WithMessage("Longitude must be between -180 and 180");

    }   
}
