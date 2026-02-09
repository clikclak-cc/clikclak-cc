variable "domain_name" {
  description = "Website domain name"
  type        = string
}

variable "bucket_name" {
  description = "S3 bucket name for static website hosting"
  type        = string
}

variable "github_repo" {
  description = "GitHub repository (owner/repo) for OIDC federation"
  type        = string
}
