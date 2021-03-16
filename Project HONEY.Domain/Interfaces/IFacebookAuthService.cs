using Project_HONEY.Domain.ModelArguments;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Project_HONEY.Domain.Interfaces
{
    public interface IFacebookAuthService
    {
        Task<FacebookTokenValidationResult> ValidateAccessTokenAsync(string accessToken);
        Task<FacebookUserInfoResult> GetUserInfoAsync(string accessToken);
    }
}
