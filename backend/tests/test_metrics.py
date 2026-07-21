def test_metrics_summary_empty(client, auth_headers):
    response = client.get("/metrics/summary", headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert data["total_participants"] == 0
    assert data["average_age"] == 0.0
    assert data["by_study_group"] == {"treatment": 0, "control": 0}
    assert data["by_status"] == {"active": 0, "completed": 0, "withdrawn": 0}


def test_metrics_summary_with_data(client, auth_headers, participant_payload):
    client.post("/participants", json=participant_payload, headers=auth_headers)
    client.post(
        "/participants",
        json={
            **participant_payload,
            "subject_id": "P002",
            "study_group": "control",
            "gender": "M",
            "age": 52,
        },
        headers=auth_headers,
    )

    response = client.get("/metrics/summary", headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert data["total_participants"] == 2
    assert data["average_age"] == 48.5
    assert data["by_study_group"]["treatment"] == 1
    assert data["by_study_group"]["control"] == 1
    assert data["by_status"]["active"] == 2


def test_metrics_require_auth(client):
    response = client.get("/metrics/summary")
    assert response.status_code == 401
