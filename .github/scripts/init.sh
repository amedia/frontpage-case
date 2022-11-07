#!/usr/bin/env bash

IS_TEMPLATE="$(curl --silent --fail \
  --header "authorization: token ${GITHUB_TOKEN}" \
  --header "Accept: application/vnd.github.baptiste-preview+json" \
  --url "https://api.github.com/repos/${GITHUB_REPOSITORY}" \
  | jq -r .is_template)"

if [ "$IS_TEMPLATE" == "true" ]; then
    echo "This is a template repository, skipping initialization"
    exit 0
fi

/usr/bin/git config --global user.email "amedia-auto@amedia.no"
/usr/bin/git config --global user.name "Amedia Auto"

REPONAME=$(echo $GITHUB_REPOSITORY | cut -f 2 -d "/")
grep -r TEMPLATE_APPNAME . | grep -vE '\.git.*' | cut -d: -f1 | sort -u | xargs /bin/sed -i "s/TEMPLATE_APPNAME/${REPONAME}/"

cat <<EOF > whoami.yaml
# TODO Please update this file with owner/team and Slack channels for notifications
owner:
#public-channel: "#team-TODO"
#private-channel: "#team-TODO"
EOF

/usr/bin/git mv _cop.json cop.json
/usr/bin/git rm .github/workflows/init.yaml
/usr/bin/git rm .github/scripts/init.sh
/usr/bin/git commit -am "Initialize repository"
/usr/bin/git push
