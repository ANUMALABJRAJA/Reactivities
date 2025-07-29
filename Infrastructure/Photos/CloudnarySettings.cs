using System;

namespace Infrastructure.Photos;

public class CloudnarySettings
{
    public required string CloudName {get; set;}
    public required string ApiKey { get; set; }
    public required string ApiSecret { get; set; }
}
