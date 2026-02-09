output "s3_bucket_name" {
  value = aws_s3_bucket.clikclak_web.id
}

output "s3_bucket_arn" {
  value = aws_s3_bucket.clikclak_web.arn
}

output "cloudfront_distribution_id" {
  value = aws_cloudfront_distribution.clikclak_web.id
}

output "cloudfront_domain_name" {
  value = aws_cloudfront_distribution.clikclak_web.domain_name
}

output "acm_certificate_arn" {
  value = aws_acm_certificate.clikclak_web.arn
}

output "acm_dns_validation_records" {
  description = "Add these CNAME records in Cloudflare (proxy OFF) to validate the ACM certificate"
  value = {
    for dvo in aws_acm_certificate.clikclak_web.domain_validation_options : dvo.domain_name => {
      name  = dvo.resource_record_name
      type  = dvo.resource_record_type
      value = dvo.resource_record_value
    }
  }
}

output "github_actions_role_arn" {
  value = aws_iam_role.github_actions.arn
}
